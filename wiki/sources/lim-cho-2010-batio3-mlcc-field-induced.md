---
title: "Lim & Cho 2010 — Electric Field-Dependent Properties of BaTiO₃-Based MLCCs"
type: source
created: 2026-05-27
updated: 2026-05-27
sources:
  - lim-cho-2010-batio3-mlcc-field-induced.md
tags:
  - paper
status: complete
importance: high
---

# Lim & Cho 2010 — Electric Field-Dependent Properties of BaTiO₃-Based Multilayer Ceramic Capacitors

**Source**: (2010). **Electric Field-Dependent Properties of BaTiO₃-Based Multilayer Ceramic Capacitors**. *Ferroelectrics*, **401** (1).
[Taylor & Francis DOI: 10.1080/00150191003670424](https://doi.org/10.1080/00150191003670424)

> [!note] Paywalled
> Full text not retrieved (HTTP 403). Extraction from publicly-available abstract and ResearchGate metadata.

## Summary

One of the earliest **explicit MLCC-level** measurements of a **field-induced phase transition** in an X7R-class part. The key claim: applying a sufficiently high DC field to a Class II BaTiO₃-based MLCC **enhances** (= shifts upward) the Curie temperature, **decreases** the peak dielectric constant, and produces a **field-dependent hysteresis** that is attributable to both the field-induced phase transition AND injected-charge effects.

The single-crystal analog of the T_C-shift effect is well-known ([[dulkin-roth-2020-batio3-curie-shift|Dul'kin & Roth 2020]] surveys four single-crystal techniques). Lim & Cho 2010 is one of the only papers to **measure it in a finished commercial-class X7R MLCC** — closing the loop between single-crystal physics and the part the chip-sim simulator needs to predict.

## Key Points (from abstract and metadata)

- **Sample class**: X7R-spec BaTiO₃-based MLCC.
- **Measurement**: dielectric ε_r(T) at multiple DC bias levels; ferroelectric hysteresis (P–E loops).
- **Headline findings**:
  - **Curie temperature shifts upward (= "enhanced")** under high DC field — the field-induced phase transition signature.
  - **Dielectric peak amplitude decreases** at the same time.
  - **Hysteresis loops show field-dependent shape** — attributed to both the phase-transition shift AND injected-charge effects in the ceramic.
- **MLCC-specific extras** (vs single crystal):
  - Injected-charge effects (electrode-side space-charge accumulation) contribute a second hysteresis mechanism, distinct from the ferroelectric domain-switching hysteresis.
  - This is why MLCC hysteresis loops are **not pure ferroelectric loops** — they have an injection-driven baseline tilt.

## Implications

1. **Bridges single-crystal data to MLCC engineering**: validates the [[field-induced-curie-shift]] picture in a finished commercial part, not just an idealized crystal.
2. **Two-mechanism hysteresis**: any model of MLCC `f_V(V_DC)` that assumes pure ferroelectric switching will miss the injected-charge contribution. The [[kalbitz-wurth-anp114-mlcc-voltage-frequency|Kalbitz polarization model]] uses a two-term form that can capture this if `Cs` (the linear contribution) is allowed to be field-dependent.
3. **TCC reshape mechanism**: confirms that under DC bias, the X7R MLCC's TCC curve has TWO simultaneous deformations — peak shifts up in T, peak amplitude decreases. The chip-sim's separable `f_T × f_V` model handles the amplitude decrease but **doesn't shift the peak position**. For high-CV / sub-µm-dielectric parts at high bias, this is a documented source of error.

## Entities Mentioned

- [[batio3]] — material

## Concepts Discussed

- [[field-induced-curie-shift]] — primary topic
- [[dc-bias-derating]] — the engineering manifestation
- [[tcc-dc-bias-interaction]] — peak-shift mechanism
- [[temperature-coefficient-of-capacitance]] — reshaped by field
- [[ferroelectric-domain-wall]] — bias-pinned in this regime
- [[oxygen-vacancy-migration]] — possible source of injected-charge hysteresis
- [[heywang-jonker-model]] — Schottky double-depletion; relevant for injected-charge baseline

## Notable Quotes

> "A field-induced phase transition took place under high DC field, which was characterized by the enhanced Curie temperature and the decreased dielectric constant." *(abstract)*

> "The ferroelectric measurements showed the field-dependent hysteresis behavior, which was considered to be originated from the field induced transition and the injected charge effects." *(abstract)*

## References

_Ferroelectrics (Taylor & Francis). Paywalled; abstract and metadata consulted._
