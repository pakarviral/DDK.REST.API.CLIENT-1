import { Request, Response } from 'express';
import { API_ACTION_TYPES } from 'ddk.registry/dist/model/transport/code';
import { TransactionData } from 'ddk.registry/dist/model/common/type';
import { Transaction } from 'ddk.registry/dist/model/common/transaction';
import { transactionSerializer } from 'ddk.registry/dist/util/serialize/transaction';

import { nodePool } from 'src/service';
import { validate } from 'src/util/validate';
import { transactionService } from 'src/service';
import { transactionRepository } from 'src/repository';
import { HTTP_STATUS } from 'src/util/http';

export class TransactionController {
    @validate
    async getById(req: Request, res: Response): Promise<Response> {
        const response = await nodePool.send<{ id: string }, Transaction<any>>(
            API_ACTION_TYPES.GET_TRANSACTION,
            req.params,
        );

        if (!response.success) {
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).send(response);
        }

        if (!response.data) {
            return res.status(HTTP_STATUS.NOT_FOUND).send(response);
        }

        return res.send(response);
    }

    @validate
    async getMany(req: Request, res: Response): Promise<Response> {
        const response = await nodePool.send(
            API_ACTION_TYPES.GET_TRANSACTIONS,
            req.body,
        );

        return res.send(response);
    }

    @validate
    async create(req: Request, res: Response): Promise<Response> {
        const transactionData: TransactionData = {
            ...req.body.transaction,
            asset: req.body.transaction.asset,
        };

        const transactionResponse = await transactionService.create(
            transactionData,
            req.body.secret,
            req.body.secondSecret,
        );

        if (!transactionResponse.success) {
            return transactionResponse;
        }

        const serializedTransaction = transactionSerializer.serialize(
            transactionResponse.data,
        );
        const response = await nodePool.send(
            API_ACTION_TYPES.CREATE_PREPARED_TRANSACTION,
            serializedTransaction,
        );

        if (response.success) {
            transactionRepository.add(transactionResponse.data);
        }

        return res.send(response);
    }
}

export const transactionController = new TransactionController();
