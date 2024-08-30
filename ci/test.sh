#!/usr/bin/env bash
#shellcheck disable=SC2039
#shellcheck disable=SC3040


set -exuo pipefail

BACKEND_CHANGES=0
FRONTEND_CHANGES=0
COMMIT_CONTENT="${ALL_CHANGED_FILES}"

if grep -q "backend" <<< "${COMMIT_CONTENT}"
then
    BACKEND_CHANGES=1
fi

if grep -q "frontend" <<< "${COMMIT_CONTENT}"
then
    FRONTEND_CHANGES=1
fi

frontend_build () {
    dc -f docker-compose.yml run \
       --rm \
       --no-deps \
       frontend \
       sh test.sh
}

backend_build () {
    docker compose \
        -f docker-compose.yml \
        run -T backend ./test.sh
}

if [[ ${FRONTEND_CHANGES} == 1 ]];
then
    echo "================== * FRONTEND BUILD * =================="
    frontend_build
else
    echo "No Changes detected for frontend -- SKIP BUILD"
fi

if [[ ${BACKEND_CHANGES} == 1 ]];
then
    echo "================== * BACKEND BUILD * =================="
    backend_build
else
    echo "No Changes detected for backend -- SKIP BUILD"
fi