#!/usr/bin/env bash
#shellcheck disable=SC2039
#shellcheck disable=SC3040


set -exuo pipefail

docker compose \
    -f docker-compose.yml \
    run -T backend ./test.sh
