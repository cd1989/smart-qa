# Smart QA

## Quick Start

### Build

```bash
$ make container-local
```

### Run

```bash
$ docker run -d -p 8080:8080 smart-server:v0.1.0
```

## Components

### Server

Server provides APIs to trigger tests.

#### Trigger Test

```
POST /api/exec/<suite>
```

For example, `/api/exec/cargo`.

#### Fetch Result

After test is executed, test results are served as static files
in path `/reports/<suite>`, results are html format files, access
them with your browsers.

### Web

Web provides UI interfaces for users to manage cluster environments,
and triggers tests.
