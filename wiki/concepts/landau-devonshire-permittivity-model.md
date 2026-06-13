---
title: Landau–Devonshire Permittivity Model — the Single εᵣ(T,E,t) Surface
type: concept
created: 2026-06-11
updated: 2026-06-13
sources:
  - dulkin-roth-2020-batio3-curie-shift.md
  - fujii-trolier-mckinstry-2023-batio3-nonlinearity.md
  - arxiv-batio3-domain-wall-motion.md
  - vishay-x7r-cap-drift-dc-bias.md
tags:
  - paper
status: complete
importance: high
---

# Landau–Devonshire Permittivity Model

The permittivity of a [[batio3|BaTiO₃]] dielectric, its temperature coefficient ([[temperature-coefficient-of-capacitance|TCC]]), its [[dc-bias-derating|DC-bias derating]], and its [[aging-class-2|aging]] are **not four relationships — they are one scalar field and its gradients.** This page writes that field explicitly and shows the others falling out as derivatives, which is why the industry's separable multiplicative derating model works (and where it breaks).

## The single space: `σ = ln εᵣ`

Define one scalar field over the operating space `(T, E, t)`:

$$
\sigma(T,E,t)\;\equiv\;\ln\varepsilon_r(T,E,t)
$$

Then the material property and every derating coefficient are the **value and partial gradients of this one field**:

| Device quantity | Operation on σ |
|---|---|
| permittivity | `εᵣ = e^σ` |
| TCC | `(1/εᵣ)(dεᵣ/dT) = ∂σ/∂T` |
| DC-bias factor `f_V` | `ln f_V = σ(T,E) − σ(T,0) = ∫ (∂σ/∂E)\,dE` |
| aging | `−∂σ/∂(ln t)` |

One potential, three slopes. This is the formal statement of the [[permittivity-stability-tradeoff]]: you cannot move `σ` up (more εᵣ) without steepening its gradients (less stability), because they share the same curvature.

## Where the field comes from — the Landau free energy

For the tetragonal ferroelectric ([[cubic-tetragonal-transition]]), the free-energy density in the polarization `P`:

$$
F(P,T,E)\;=\;\tfrac12\alpha(T)P^2+\tfrac14\beta P^4+\tfrac16\gamma P^6-E\,P,
\qquad
\alpha(T)=\frac{T-T_0}{\varepsilon_0\,C_\mathrm{cw}}
$$

`C_cw` ≈ 1.5×10⁵ K is the Curie constant, `T₀ ≈ T_C` ([[curie-temperature]]). Permittivity is the **inverse curvature of this well** at the equilibrium polarization:

$$
\frac{1}{\varepsilon_0\varepsilon_r}=\frac{\partial^2F}{\partial P^2}\bigg|_{P_\text{eq}}=\alpha(T)+3\beta P_\text{eq}^2+5\gamma P_\text{eq}^4,
\qquad P_\text{eq}\ \text{solves}\ E=\alpha P+\beta P^3+\gamma P^5
$$

`εᵣ(T,E)` is therefore one smooth surface parameterised by `(α(T), β, γ)`. High εᵣ ⇔ a soft, low-curvature well ⇔ the mobile-[[ferroelectric-domain-wall|domain-wall]] regime.

## Closed form (paraelectric 2–4 limit)

Dropping `γ` and solving above `T_C`, the surface has an explicit form:

$$
\boxed{\;\sigma(T,E)=\underbrace{\ln C_\mathrm{cw}-\ln(T-T_0)}_{\sigma_0(T)=\ln\varepsilon_r(T,0)}\;-\;\tfrac13\ln\!\big[1+B\,e^{3\sigma_0(T)}E^2\big]\;}
$$

Every coefficient drops out of this one expression:

- **εᵣ** `= e^σ`.
- **Curie–Weiss** (the `E=0` slice): `εᵣ(T,0)=C_cw/(T−T₀)` ⟹ `TCC = ∂σ₀/∂T = −1/(T−T₀) = −εᵣ/C_cw`. **|TCC| ∝ εᵣ** — the temperature-stability tax, quantified.
- **Johnson tunability** (the `E`-section): `f_V = e^{σ−σ₀} = [1 + B·εᵣ(0)³·E²]^{−1/3}`. **Tunability ∝ εᵣ(0)³** — the DC-bias tax, quantified. (The simulator uses the empirical sigmoid `f_V=1/(1+(E/E₀)^p)` from [[dc-bias-derating]] instead, a calibrated fit to the same `ε(E)` decline.)
- **The coupling is built in**: the field term carries `e^{3σ₀}=εᵣ(0,T)³ ∝ (T−T₀)⁻³`, so DC-bias loss **diverges as `T→T_C`**, and `∂/∂T` of that term is the field-induced reshaping of the TCC curve — the [[field-induced-curie-shift|+130 mK/(V/µm) Curie shift]]. The two sections rotate into each other near `T_C`, automatically.

## The multiplicative model is this surface, linearised

The industry/[[tcc-dc-bias-interaction|chip-sim derating model]] `C = C_rated·f_T·f_V·f_AC·f_age` is exactly "**σ is additive across axes**," because a product is a sum in log-space:

$$
\ln C = \ln C_0 + \underbrace{\Delta\sigma_T}_{\ln f_T} + \underbrace{\Delta\sigma_E}_{\ln f_V} + \underbrace{\Delta\sigma_t}_{\ln f_\text{age}} + \underbrace{\tfrac{\partial^2\sigma}{\partial T\,\partial E}\Delta T\,\Delta E+\dots}_{\text{cross terms (dropped)}}
$$

So the separable multiplicative model is the **first-order, zero-cross-derivative approximation** of the single surface. Its known ~5–10 % error near `T_C` / for [[y5v-z5u-class-iii-dielectric|Y5V]] is precisely the `∂²σ/∂T∂E` cross-term it throws away ([[tcc-dc-bias-interaction]]). The "single space" and the "multiplicative model" are the same object — one exact, one separated.

## Intrinsic vs extrinsic — what's schematic, what's exact

The closed form above is the **intrinsic, single-crystal** Landau surface. In a real MLCC, ~99 % of εᵣ is **extrinsic** [[ferroelectric-domain-wall|domain-wall motion]] (Gurung 2024: extrinsic ≫ intrinsic), plus [[core-shell-batio3|core-shell]], [[nano-grain-batio3-epsilon-r|grain-size]] and electrode-field-concentration effects. So:

- The **coefficients** (`C_cw`, `B`, `E₀`, `p`) are not the textbook Landau values — they must be fitted to measured data ([[empirical-c-t-vdc-academic-measurements]], [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Rayleigh decomposition]]).
- The **structure is exact regardless of mechanism**: εᵣ(T,E,t) is one scalar field; TCC / DC-bias / aging are its gradients; the multiplicative model is its separable approximation. The truly faithful "single space" is an **empirical `σ(T,E,t)` surface** — exactly what Murata's dynamic SimSurfing model interpolates ([[vendor-spice-models]]).

## Scope & limits — modern multi-additive MLCC

Pure analytic LD is **homogeneous, single-order-parameter, mean-field** — it describes a uniform crystal. A cutting-edge MLCC dielectric (5+ dopants, [[core-shell-batio3|core–shell]] grains, a grain-size *distribution*, ~99 % extrinsic [[ferroelectric-domain-wall|domain-wall]] εᵣ) violates every one of those assumptions. LD is the *scaffold*, not the finished model; the field stacks extensions on it, and the last rung is empirical:

| Layer | What it adds | Cost / limit |
|---|---|---|
| Homogeneous LD (this page) | the εᵣ(T,E) surface, Curie–Weiss, Johnson | uniform single crystal only; coefficients fitted, not derived |
| Chemistry → coefficients | dopant → Tᴄ/εᵣ shifts ([[class-specific-tc-engineering]], [[epsilon-r-from-dopant-composition]]) | empirical slope tables, ~30 % uncertain |
| Ginzburg–Landau / phase-field (TDGL, +∇P) | domain walls, domain patterns, microstructure | compute-heavy; still needs LD coefficients as input |
| Effective-medium composite | core + shell + grain-boundary averaging ([[core-shell-batio3]]) | needs volume fractions + per-region εᵣ |
| Size-dependent coefficients / diffuse transition | grain-size distribution → smeared peak ([[nano-grain-batio3-epsilon-r]]) | the sub-200 nm collapse is grafted on, not predicted |
| Relaxor / random-field models | replaces the single order parameter for PNR ([[polar-nanoregions-pnr]], [[relaxor-ferroelectric]]) | genuinely beyond LD |
| **Empirical surface + calibration** | measured εᵣ(T,E,t) / fitted coefficients ([[empirical-c-t-vdc-academic-measurements]]) | the faithful model for a finished part |

**Punchline:** no model — LD, phase-field, or otherwise — predicts a finished multi-additive, distributed-grain MLCC's derating *from recipe alone*. The faithful representation is **measure-then-calibrate**. This is the explicit reason the [[capacitance-simulation-from-recipe-and-geometry|chip-sim]] does not compute εᵣ from LD but uses an empirical grain-size εᵣ curve + DC-bias sigmoid + a real-data calibration layer: LD fixes the *shape of the law* (one surface, three gradients); the *numbers* for a 2025 high-CV core-shell part come from fitting to real parts.

## Implications for the simulator
- The Tier-2 model already lives on this surface in its separable form (`f_T·f_V·f_age`); the upgrade path is to carry the **cross-term** near `T_C` (the field-induced Curie shift, +130 mK/(V/µm)) rather than treat T and V_DC as orthogonal.
- `(C_cw or E₀, p)`-style coefficients are per-recipe and should be **calibrated against real parts** (the same calibration philosophy the design suggester uses).
- Above `T_C` the field collapses to `f_V≈1` (`α'→0`, [[fujii-trolier-mckinstry-2023-batio3-nonlinearity|Fujii 2023]]) — the surface flattens into the paraelectric [[c0g-npo-dielectric|C0G]] regime.

## Cross-references
- [[permittivity-stability-tradeoff]] — the qualitative consequence: high εᵣ ⇔ steep gradients
- [[temperature-coefficient-of-capacitance]] — the `∂σ/∂T` section
- [[dc-bias-derating]] — the `ε(E)` section (empirical sigmoid)
- [[field-induced-curie-shift]] — the `∂²σ/∂T∂E` coupling term
- [[tcc-dc-bias-interaction]] — the separable (linearised) model and where it breaks
- [[aging-class-2]] — the `∂σ/∂ln t` section
- [[ferroelectric-domain-wall]] — why real εᵣ is extrinsic; the curvature picture
- [[curie-temperature]], [[cubic-tetragonal-transition]] — where `α(T)` changes sign
- [[mlcc-capacitance-equation]] — `C = εᵣ·ε₀·A·N/d`; this page is the `εᵣ(T,E,t)` factor
- [[core-shell-batio3]], [[nano-grain-batio3-epsilon-r]] — the extrinsic corrections

## References
- [[dulkin-roth-2020-batio3-curie-shift]] — field-induced Curie shift (the coupling coefficient)
- [[fujii-trolier-mckinstry-2023-batio3-nonlinearity]] — Rayleigh decomposition of εᵣ; α′→0 above T_C
- [[arxiv-batio3-domain-wall-motion]] — extrinsic (domain-wall) dominance of εᵣ
- [[vishay-x7r-cap-drift-dc-bias]] — measured `ε(E)` / hysteresis
- Devonshire, *Phil. Mag.* 40 (1949) / 42 (1951); Johnson, *Phys. Rev.* 123 (1962) 2766 — Curie–Weiss / Landau tunability (standard ferroelectric theory)
