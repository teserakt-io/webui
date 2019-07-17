#!/bin/bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

echo "e4 webui Docker build script (c) Teserakt AG 2018-2019. All Right Reserved"
echo ""

E4_VERSION="${CI_COMMIT_REF_NAME//\//_}"
E4_GIT_COMMIT="${CI_COMMIT_SHORT_SHA}"

if [[ -z "$E4_VERSION" ]]; then
    E4_VERSION="devel"
fi

if [[ -z "$E4_GIT_COMMIT" ]]; then
    E4_GIT_COMMIT=$(git rev-list -1 HEAD)
fi

echo "Building version $E4_VERSION, commit $E4_GIT_COMMIT\n"

printf "=> webui"
docker build \
    --tag "registry.gitlab.com/teserakt/e4/webui:$E4_VERSION" \
    --tag "registry.gitlab.com/teserakt/e4/webui:$E4_GIT_COMMIT" \
    -f "${DIR}/../docker/Dockerfile" \
    "${DIR}/../"
