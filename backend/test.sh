#!/usr/bin/env bash
#shellcheck disable=SC3040

set -euo pipefail

pip -q install --upgrade pip
pip -q install --cache-dir=.pip -r requirements.txt

./manage.py migrate
./manage.py test
