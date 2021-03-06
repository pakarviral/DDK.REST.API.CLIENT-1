# Environment

## How to create environment file

Create a copy of example.env file

```
$ cp docker/example.env .env
```

## Environment variables

### RestAPI Client port

The default port is `7070`, but you can set any value

```
SERVER_PORT=7070
```

### DDK Node hosts

It is a comma-separated host:port string

List with trusted nodes is [here](https://github.com/AraiEzzra/DDKCORE/blob/master/docs/api/example.md)

Example

```
NODE_HOSTS=xxx.xxx.xxx.xxx:yyyy,xxx.xxx.xxx.xxx:yyyy,...,xxx.xxx.xxx.xxx:yyyy
```

### DDK Workspace

#### Workspaces

| Name        | Value |
|-------------|-------|
| DEVELOPMENT | 0     |
| TESTNET     | 1     |
| MAINNET     | 2     |

```
WORKSPACE=2
```

### Webhook settings

The payload URL is the URL of the server that will receive the webhook `POST` requests.

#### On Apply Transaction

Calls after forging each transaction

```
ON_APPLY_TRANSACTION=webhook_url
```

#### On Apply Block

Calls after forging each block

```
ON_APPLY_BLOCK=webhook_url
```

#### On Decline Transaction

Calls after decline transaction

```
ON_DECLINE_TRANSACTION=webhook_url
```

### Time server host

#### Default time server settings

Host: 31.28.161.181

Port: 7015

```
TIME_SERVER_HOST=http://31.28.161.181:7015/getTime
```
