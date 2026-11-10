---
title: "MLCC Chamfering, Termination & Plating Research Notes (patent + NASA survey, 2026-11)"
type: source
created: 2026-11-10
updated: 2026-11-10
sources:
  - resources/manufacturing/60-termination-and-plating.md
tags:
  - patent
  - survey
status: complete
importance: high
---

# MLCC Chamfering, Termination & Plating Research Notes

**Type:** compiled research notes (2026-11-10) drawn from 10 sources. Seven are patents: US4517155 (Union Carbide/KEMET Cu termination), US7083744 (Cu paste), US5712758 (Rohm chamfer + dual-layer termination), US8941971, US8953300 and US9336952 (SEMCO), and US10020117 (Taiyo Yuden barrel polishing). The rest are two NASA NEPP documents (Teverovsky CDR35 cracking 2017; Brusse tin whiskers 2002) and the Murata capacitor guide. The KEMET flex-termination documents could not be fetched.

## Key claims
- Cu termination is fired in N₂ with 30–180 ppm O₂ at 600–900 °C, preferably 650–750 °C, for 15–70 min. Newer pastes fire at 700–770 °C or at ≤750 °C.
- The frit window is 5–15 wt%. The fired glass/Cu ratio is 0.4–2.0: at 2.1, IR failures reached 726 per 10,000.
- A corner radius of at least 0.10 mm (preferably 0.13–0.15 mm) cuts thermal-shock rejects. In the Rohm example this took 12 h at 78 rpm.
- Thick Ni plating (6–10 µm) plus plating hydrogen is linked to termination delamination, worse in PME parts. Whiskers up to 240 µm appeared even with a Ni barrier.

## Conflicts / gaps
- Firing temperature varies with paste generation.
- Ni thickness has no consensus value (2–10 µm). This is flagged on [[termination-and-plating]].
- No band-width values in µm, no current barrel-plating parameters, and no flex-termination thickness.

## Concepts
- [[termination-and-plating]] · [[barrel-chamfering-mlcc]] · [[failure-modes-mlcc]] · [[mlcc-delamination]]

## References
_Original source: `resources/manufacturing/60-termination-and-plating.md`_
- [[nasa-cracking-low-voltage-mlcc]] (related NEPP report)
