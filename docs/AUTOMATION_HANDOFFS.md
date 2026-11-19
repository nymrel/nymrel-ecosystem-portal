# Review the next automation handoff

Before passing work to your existing downstream code, inspect the decision or
outcome it will consume. These three Nymrel MIT repositories offer independently
usable pieces:

| Your question | Component | Outcome to inspect |
| --- | --- | --- |
| Which model fits these constraints? | Nymrel Agent workbench | Selected, Blocked or Invalid input |
| Does this authenticated record claim success? | Proof Ledger demo | Authentication, artifact checks and requested task policy |
| Was enough source analyzed to accept no findings? | noop-flags checked scan | Complete/clean, complete/findings or incomplete |

Choose one for an existing application or CI job. This walkthrough does not wire
the components into a combined pipeline.

## Use the pinned source

The additions below are **merged source and unreleased** as of November 9, 2026.
Earlier downloads do not acquire these features when source changes. Build the
pinned checkouts rather than assuming a registry package includes them.

| Component | Pinned merged source | Change |
| --- | --- | --- |
| Nymrel Agent | [`e6ea68b`](https://github.com/nymrel/nymrel-agent/tree/e6ea68b851bae3b1acb1102715b0deac9681e735) | [Local workbench, PR #19](https://github.com/nymrel/nymrel-agent/pull/19) |
| Proof Ledger | [`ca7c696`](https://github.com/nymrel/nymrel-proof-ledger/tree/ca7c69602c1256acbceabb4aa1f648e787056145) | [Retained task-policy demo, PR #56](https://github.com/nymrel/nymrel-proof-ledger/pull/56) |
| noop-flags | [`544b6a1`](https://github.com/nymrel/noop-flags/tree/544b6a1ff41b48f112b574b0d3d0fbb0286d1eb6) | [Checked scoped scan, PR #18](https://github.com/nymrel/noop-flags/pull/18) |

Initial source and dependency downloads need network access. Run each block
separately from the parent directory where you want that checkout. The examples
run locally after setup.

## Inspect a routing decision

Use Git, Node.js `>=22 <25` (supported CI lines 22 and 24), Corepack,
npm `11.19.1` and a local browser. The workbench requires source development
dependencies; a production-only package install is not its runner.

```sh
git clone https://github.com/nymrel/nymrel-agent.git
cd nymrel-agent
git checkout e6ea68b851bae3b1acb1102715b0deac9681e735
corepack npm@11.19.1 ci
corepack npm@11.19.1 run workbench -- --port 0
```

Open the printed `http://127.0.0.1:PORT/` URL. The synthetic catalog starts with
USD `0.050000` and `10000 ms` ceilings:

| Try this | Expected result |
| --- | --- |
| Keep the example's ceilings | **Selected:** `provider-b/fast`, estimated USD `0.012000` and `900 ms` |
| Lower the USD ceiling to `0.010000` | **Blocked:** inspect the cost-budget rejection reasons |
| Enter a seventh USD decimal place | **Invalid input:** correct the field or use **Reset example** |

Use **Reset example** to recover, then export validated metadata and its canonical
plan if your adapter needs them. Blank ceilings are unset; `0` stays explicit.
Changing the objective need not change the winner.

Costs and latency are synthetic caller estimates. The workbench makes no
provider call and grants no execution authority. Edits stay in browser memory;
explicit exports can contain imported catalog metadata. Stop the runner with
Ctrl+C. Follow the [pinned workbench guide](https://github.com/nymrel/nymrel-agent/blob/e6ea68b851bae3b1acb1102715b0deac9681e735/docs/ROUTER_LIBRARY.md#local-graphical-workbench)
for import/export limits and the router API your application can consume.

## Check an authenticated task claim

Use Git, Node.js `22.12` through `26.x` and npm `11`. Choose a new output
directory whose parent already exists:

```sh
git clone https://github.com/nymrel/nymrel-proof-ledger.git
cd nymrel-proof-ledger
git checkout ca7c69602c1256acbceabb4aa1f648e787056145
npm ci --ignore-scripts
npm run build
node examples/task-success-demo.mjs ../new-ledger-task-demo
```

The demo creates two synthetic signed records, artifacts and a separate
public-only verification configuration. It invokes the actual CLI with an
explicit public key and algorithm, `--check-files` and `--require-task-success`:

| Signed record | Authentication and artifact checks | Requested task policy | Verifier exit |
| --- | --- | --- | --- |
| SUCCESS, exit 0 | Pass | Pass | `0` |
| FAILURE, exit 1 | Pass | Reject | `1` |

The demo itself prints JSON `status: "PASS"` and exits zero only when **both
expected outcomes** match. The failed task fixture remains failed. The disposable
private key stays in memory; the retained files contain public configuration,
receipts and artifact bytes. Existing files, directories and symlinks at the
output path are refused. Output remains on success or failure; inspect partial
output and choose another new path before retrying.

This verifies synthetic signed claims and matching artifact bytes. It does not
observe task execution or establish signer authority, authorization or freshness.
Real verifiers obtain their trusted public key and expected algorithm through an
independently authenticated channel. The [pinned demo guide](https://github.com/nymrel/nymrel-proof-ledger/blob/ca7c69602c1256acbceabb4aa1f648e787056145/docs/QUICKSTART.md#try-the-retained-task-policy-demo-unreleased-source)
also shows how to run the example from a separate application using an exact
locally built archive. Older archives can have the policy flag without the demo.

## Require a known scoped scan

Use Git and a maintained Python `3.11–3.14` release. This single-file scanner
has no runtime dependencies. Run it against a stable source tree:

```sh
git clone https://github.com/nymrel/noop-flags.git
cd noop-flags
git checkout 544b6a1ff41b48f112b574b0d3d0fbb0286d1eb6
python noop_flags.py /absolute/path/to/your/python-cli --require-complete --sarif > checked.sarif
```

Replace the target with your Python CLI source file or directory. Choose a new
report filename: shell redirection replaces an existing file. Run this command
as its own CI step and retain the SARIF report for every exit:

Complete results require at least one analyzed source and no eligible source
skips.

| Example within the documented scope | Exit | Meaning |
| --- | --- | --- |
| All eligible sources analyzed; every `argparse` option is read | `0` | Complete scan, no findings |
| All eligible sources analyzed; an option is accepted but never read | `1` | Complete scan, findings |
| An empty directory has zero analyzed sources | `2` | Completeness not established |

Unreadable inputs, unsupported/dynamic sources and observed source changes can
also produce incomplete results. Findings already obtained remain in the report
when the gate returns `2`. Inspect the diagnostics, fix the input or choose a
supported source scope, then rerun on a stable tree.

Completion covers eligible regular Python files after the documented named
exclusions, using the existing single-file `argparse` analyzer. It does not
establish all CLI behavior or cross-file correctness. Source-change observations
are best effort.
The report stays local; this command does not upload it. Existing defaults
remain unchanged without `--require-complete`. Read the [pinned checked-mode guide](https://github.com/nymrel/noop-flags/blob/544b6a1ff41b48f112b574b0d3d0fbb0286d1eb6/README.md#require-a-known-scoped-scan-before-accepting-a-clean-result)
for the precise scope and JSON/SARIF fields.

## Bring one useful result back to your stack

Try one component with a minimal synthetic input before adapting it to your
workflow. Keep provider execution in your application, verifier trust in your
own configuration and scan acceptance tied to the documented scope.

If an input or recovery step is unclear, open an issue in
[Nymrel Agent](https://github.com/nymrel/nymrel-agent/issues),
[Proof Ledger](https://github.com/nymrel/nymrel-proof-ledger/issues) or
[noop-flags](https://github.com/nymrel/noop-flags/issues). Include the pinned
commit, runtime, expected and observed outcome, and a small synthetic example.
Remove credentials, private paths and customer contents before sharing.
