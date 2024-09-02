#!/usr/bin/env bash
#shellcheck disable=SC2039
#shellcheck disable=SC3040


set -exuo pipefail

[[ "${CI_BRANCH}" ==  "gh-pages" ]] && { echo "GH Pages update. Skip all"; exit 0; }

#Detect tag for prod/staging deployment
tag_pattern="^[0-9]+\.[0-9]+\.[0-9]+$"
if [[ "${CI_BRANCH}" =~ $tag_pattern && -z "${CI_TAG}" ]]; then
    echo "This commit processed on Release CI. Skip all"
    exit 0
fi

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

if [[ "${CI_TAG}" =~ $tag_pattern || "${CI_BRANCH}" ==  "main" && "${CI_PULL_REQUEST}" !=  "true" ]];
then
    BACKEND_CHANGES=1
    FRONTEND_CHANGES=1
fi

frontend_test () {
    docker compose -f docker-compose.yml run \
       --rm \
       --no-deps \
       frontend \
       sh test.sh
}

backend_test () {
    cp -r .git ./backend/.git
    docker compose \
        -f docker-compose.yml \
        run -T backend ./test.sh
}

if [[ ${FRONTEND_CHANGES} == 1 ]];
then
    echo "================== * FRONTEND TEST * =================="
    frontend_test
else
    echo "No Changes detected for frontend -- SKIP TEST"
fi

if [[ ${BACKEND_CHANGES} == 1 ]];
then
    echo "================== * BACKEND TEST * =================="
    backend_test
else
    echo "No Changes detected for backend -- SKIP TEST"
fi
