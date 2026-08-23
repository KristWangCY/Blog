---
title: "TI 2026 Dota 2 Analytics: A Research-Only Model Postmortem"
subtitle: "What 1,054 maps, strict leakage controls, and a five-map Grand Final taught me about esports forecasting."
category: "Project Updates"
description: "A public-safe and reproducible review of TI 2026 match modeling and BP forecasting, including what failed and why the system remains research-only."
date: "2026-08-23"
pinned: false
---

## The result first

Team Spirit defeated Team Vision **3–2** in the TI 2026 Grand Final. My project did not earn the right to publish a confident pre-match probability: the v3 model failed to beat its Elo baseline, the post-draft model added no validated value, and calibration did not pass the release gate.

That makes this a more useful engineering story than a victory lap. The public result is a reproducible negative-result case study: good data controls, a strategically relevant hero pool, weak exact BP actions, and a model that remained **research-only** when the evidence did not support release.

The sanitized code, methodology, aggregate evidence, and automated release gates are available in the [TI 2026 Dota 2 Analytics repository](https://github.com/KristWangCY/TI2026-Dota2-Analytics).

## The research window and data boundary

I registered a study window from **7 April to 14 August 2026**, then reserved the final series for post-event evaluation. The controlled dataset contained:

- 1,054 professional maps in the target set;
- 147 TI maps;
- 10,540 player-verification rows in the private quality pipeline;
- 1,051 maps with complete BP, plus three historical maps quarantined for incomplete drafts;
- 966 maps in the frozen-v1 segment and 88 in the live-v2 holdout.

OpenDota supplied match metadata and match-detail draft actions. Official TI pages were the authority for schedule and result verification. Liquipedia was used only as a human cross-check, without reproducing its tables, prose, images, or logos.

The public repository deliberately excludes raw and curated data, player identifiers, model binaries, private prompts, AI responses, per-match probabilities, championship probabilities, team rankings, and internal file paths.

## Data quality before modeling

Each candidate map had to pass a data contract covering match identity, UTC start time, team identity, winner side, ten-player coverage, ordered BP actions, source agreement, and a stable input hash.

The final audit found:

- zero duplicate match IDs;
- zero player-coverage failures;
- zero unresolved source conflicts;
- zero future-dated rows;
- zero hash mismatches;
- six historical duration outliers that were reviewed rather than silently deleted.

The important lesson is that a clean row count is not enough. In an evolving esport, roster changes, stand-ins, patch boundaries, delayed API updates, and incomplete historical drafts are all time-dependent data problems.

## Preventing the easiest form of “accuracy”

Random train/test splits were forbidden. Features could only be joined when their effective timestamp was no later than the forecast timestamp. Preprocessing, feature selection, fitting, and calibration were restricted to past folds.

The target map's result, duration, final series score, tournament placement, and draft were all forbidden in a pre-match feature set. The post-draft model was evaluated separately: it could see a completed draft, but still could not see the result.

This was also the red team's most important job. A sports model can look excellent when future information leaks through team rankings, roster snapshots, patch labels, or post-event aggregates. The release rules treated an unexplained join as a failure, not as a convenient feature.

## Elo beat the complex candidates

The 88-map live-v2 holdout produced these aggregate results:

- Elo: log loss 0.6773, Brier 0.2419, accuracy 0.6023, ROC-AUC 0.6047, and expected calibration error 0.0647.
- v3 pre-match: log loss 0.6830, Brier 0.2448, and ROC-AUC 0.5845.
- post-draft: log loss 0.7103, Brier 0.2583, and ROC-AUC 0.4997.

Lower log loss and Brier are better; higher ROC-AUC is better. v3 did not beat Elo. The post-draft model was worse and showed no incremental value. Calibration also failed its registered threshold.

The correct response was not to choose a friendlier metric or publish only the final pick. All three failures remained visible, and the release state stayed `research_only`.

## What the BP review actually showed

Before interpreting the BP result, the unit of measurement matters. I reviewed a four-hero focus pool across five maps, creating 20 hero-map opportunities:

- Treant Protector appeared in 5 of 5 maps;
- Earth Spirit appeared in 5 of 5;
- Keeper of the Light appeared in 4 of 5;
- Lone Druid appeared in 2 of 5.

That is **16 of 20 focus-pool opportunities**, or 80% strategic-pool overlap. It is not “80% BP prediction accuracy.”

The exact checks were much weaker:

- Team Vision first-phase ban hits: 3 of 18 predicted actions, across three maps;
- Team Spirit first-phase ban hits: 4 of 17, across two maps;
- first-pick hits: 1 of 5 for each team.

The project identified a relevant hero cluster, but did not reliably assign exact bans, first picks, or ordering to each team. Pool-level scouting and action-level BP forecasting are different tasks; combining them into one accuracy figure would hide the failure.

## Four analyst seats and one release decision

I organized four DeepSeek analyst roles under Codex as AI Chief:

- a data analyst checked match IDs, roster changes, duplicates, source conflicts, and anomalies;
- a patch/BP analyst tracked hero priority, composition counters, and patch drift;
- a team analyst reviewed roster continuity, recent form, hero pools, and opponent strength;
- a red-team reviewer challenged leakage, overconfidence, drift, and contradictions.

Codex supplied data, audited requests and conclusions, and escalated release decisions to me as owner. The public evidence is the structured, independently checkable output—not the model providers' private reasoning or raw meeting transcript.

## Six gates that stopped an unjustified release

The publication process checked six controls: data quality, temporal integrity, value over Elo, calibration, post-draft incremental value, and explicit owner authorization.

Data quality and temporal integrity passed. The baseline, calibration, and draft-value gates did not. Owner approval allowed this transparent postmortem to be published, but it could not turn a failed model into a validated probability product.

## What I would change next

- Register BP metrics before the event at hero, phase, action, order, and team levels.
- Increase the patch-specific sample and model patch-transition uncertainty directly.
- Version roster membership and stand-ins by effective time, not by the latest available snapshot.
- Use nested chronological validation for feature selection and calibration.
- Compare draft models with simple team-frequency and patch-priority baselines.
- Keep forecast artifacts frozen and separate from post-event evaluation.

The project is not betting advice. Its useful output is a transparent workflow for knowing when **not** to publish a number.

## Sources

- [OpenDota API documentation](https://docs.opendota.com/)
- [The International official esports page](https://www.dota2.com/esports/ti15)
- [Steam Web API Terms of Use](https://steamcommunity.com/dev/apiterms)
- [Liquipedia API terms](https://liquipedia.net/api-terms-of-use)
- [Independent Grand Final result report](https://fieldlevelmedia.com/%25news_cat%25/team-spirit-outlast-team-vision-to-win-the-international-2026/)

