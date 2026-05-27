---
title: Soft-Termination MLCC
type: concept
created: 2026-05-27
updated: 2026-05-27
sources:
  - covaci-gontean-2022-singing-mlcc.md
status: draft
importance: medium
---

# Soft-Termination MLCC

An MLCC with a **mechanically compliant layer between the chip body and the external solder termination**, designed to **decouple board-level mechanical stress from the chip body**. The compliant layer is typically a conductive epoxy or polymer filled with metal particles.

## Why it exists

1. **Flex-crack mitigation**: a rigid termination transmits PCB bending stress straight into the brittle ceramic, causing diagonal flex cracks ([[failure-modes-mlcc|failure mode]]). A soft termination absorbs the strain.
2. **Acoustic-noise reduction**: the same compliance decouples MLCC strain from the PCB, dropping the [[mlcc-acoustic-noise|"singing"]] SPL by 10–20 dB.
3. **Effective-capacitance stability**: by removing the strain feedback, soft-term parts have **flatter [[ac-voltage-coefficient-mlcc|`f_AC(V_AC)` curves]]** — useful for circuits where the AC swing varies.

## Vendor families

- **KEMET FT-CAP / Flex-Term** — soft-termination commercial line.
- **[[us-8713770-kemet-flex-crack-voids|KEMET FO-CAP]]** — sacrificial-void route, different mechanism for the same goal.
- **KYOCERA-AVX OpenMode** — internal-design route to prevent flex cracks from short-circuiting.
- **Murata ZRB / ZRC** — soft-termination automotive line.
- **TDK MEGACAP**.
- **JCC X7R / X5R soft-term lines**.

## Trade-offs vs standard termination

| | Standard termination | Soft termination |
|---|---|---|
| Cost | Lower | Higher (~ +20–50 %) |
| Flex tolerance (board bend) | Lower | Higher (5+ mm bend without crack) |
| Acoustic SPL | Higher | 10–20 dB lower |
| AC voltage coefficient | More pronounced | Suppressed |
| Termination resistance | Lower (~ mΩ) | Slightly higher (epoxy adds R_term) |
| Thermal cycling | Standard | Better |
| Solderability | Standard | Equivalent |

## Implications for the simulator

Soft termination is a **recipe-level toggle** that affects the strain-coupled contribution to the [[ac-voltage-coefficient-mlcc|AC voltage coefficient]] and indirectly the [[tcc-ac-coupling|TCC × AC]] curve. The chip-sim simulator should expose a `termination = soft | standard` parameter; setting `soft` suppresses the piezo-electrostriction contribution to `f_AC`.

## Cross-references

- [[mlcc-acoustic-noise]] — primary motivation
- [[failure-modes-mlcc]] — flex-crack mitigation
- [[us-8713770-kemet-flex-crack-voids]] — sibling technology (different KEMET patent path)
- [[ac-voltage-coefficient-mlcc]] — second-order effect
- [[piezoelectricity-batio3]], [[electrostriction]] — root mechanisms

## References

- [[covaci-gontean-2022-singing-mlcc]]
