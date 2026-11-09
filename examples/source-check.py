"""Controlled JSON-inventory check using Source Read's published 0.2.0 API.

The consumer owns acquisition, shape validation and policy. A complete empty
array passes; any finding fails; unavailable or malformed input stays UNKNOWN.
No argument means no source was supplied, which also stays UNKNOWN.
"""

import argparse
import json
from pathlib import Path

from source_read import SourceRead, assess_check

MAX_BYTES = 64 * 1024


def reject_non_json_constant(_value):
    raise ValueError("inventory contains a non-JSON numeric constant")


def read_inventory(path):
    try:
        with path.open("rb") as stream:
            raw = stream.read(MAX_BYTES + 1)
        if len(raw) > MAX_BYTES:
            raise ValueError("inventory exceeds the example size limit")
        value = json.loads(raw.decode("utf-8"), parse_constant=reject_non_json_constant)
        if not isinstance(value, list):
            raise ValueError("inventory must be one complete JSON array")
    except (OSError, UnicodeError, ValueError, RecursionError) as error:
        return SourceRead.unreadable(path, type(error).__name__, empty=[])
    return SourceRead.ok(value, label=path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("inventory", type=Path, nargs="?")
    args = parser.parse_args()
    reads = [] if args.inventory is None else [read_inventory(args.inventory)]
    # This is this consumer's policy, not a policy supplied by Source Read.
    passed = all(not read.value for read in reads if read.readable)
    result = assess_check(reads, passed=passed)
    outcome = "PASS" if result.is_pass else "FAIL" if result.is_fail else "UNKNOWN"
    # Omit paths, failure reasons and inventory contents from this demo output.
    print(f"{outcome} sources={len(reads)} exit_code={result.exit_code}")
    return result.exit_code


if __name__ == "__main__":
    raise SystemExit(main())
