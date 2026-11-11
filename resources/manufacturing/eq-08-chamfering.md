# MLCC Chamfering (Barrel Corner Rounding): Equipment and Step Order
_Collected: 2026-11-11 · raw research notes (immutable source material)_

Note: all patent facts below come from Google Patents full text read via WebFetch (most pages truncated at ~100k chars; second chunks read where noted). Patent examples are inventor embodiments, not production settings. Equipment-maker web pages give structure and claims only, no MLCC process numbers. directindustry.com catalogs (Tipton) returned HTTP 403 and could not be read; those leads are listed as snippets. Earlier corpus keys [us5712758] and [us10020117] are in `60-termination-and-plating.md`; [us10020117] was re-read here for the barrel passage.

## Sources
| key | title | publisher | year | tier | URL |
|---|---|---|---|---|---|
| [us6367134] | Method of producing a ceramic electronic part (dry centrifugal barrel; barrel blast) | Murata Manufacturing (patent US6367134B1) | 2002 (prio. 1999-02-04) | T4 | https://patents.google.com/patent/US6367134 |
| [jp2010283164a] | Method of manufacturing electronic component (green-chip barrel polishing in Ba-saturated liquid) | TDK (application JP2010283164A, withdrawn 2012, no exam request) | 2010 (prio. 2009-06-04) | T4 | https://patents.google.com/patent/JP2010283164A/en |
| [us11978592] | Dielectric composition and multilayer ceramic electronic device (process section) | TDK (patent US11978592B2) | 2024 (prio. 2021-05-26) | T4 | https://patents.google.com/patent/US11978592B2/en |
| [us11037731] | Multi-layer ceramic electronic component and mounting board (barrel step S02, Ra/Rb) | Taiyo Yuden (patent US11037731B2) | 2021 (prio. 2018-11-27) | T4 | https://patents.google.com/patent/US11037731B2/en |
| [us11049660] | Multi-layer ceramic electronic component and method of producing (barrel step S05) | Taiyo Yuden (patent US11049660B2) | 2021 (prio. 2018-03-28) | T4 | https://patents.google.com/patent/US11049660B2/en |
| [us10020117] | Multi-layer ceramic capacitor and method of producing the same (re-read) | Taiyo Yuden (patent US10020117B2) | 2018 (prio. 2016) | T4 | https://patents.google.com/patent/US10020117B2/en |
| [us9687954] | Centrifugal barrel polishing device and barrel polishing method | Sintokogio (patent US9687954B2) | 2017 (prio. 2013-02-25) | T4 | https://patents.google.com/patent/US9687954B2/en |
| [us9283647] | Centrifugal barrel polishing machine and centrifugal barrel polishing method | Tipton Corp (patent US9283647B2) | 2016 (prio. 2012-02-22) | T4 | https://patents.google.com/patent/US9283647B2/en |
| [us12103132] | Centrifugal barrel polishing machine and centrifugal barrel polishing method (lid-fix detection) | Tipton Corp (patent US12103132B2) | 2024 (prio. 2018-07-06) | T4 | https://patents.google.com/patent/US12103132B2/en |
| [us10957489] | Medium and method of manufacturing electronic component (vibration surface treatment) | Murata Manufacturing (patent US10957489B2; both 100k chunks read) | 2021 (prio. 2016-09-28) | T4 | https://patents.google.com/patent/US10957489 |
| [us8932108] | High speed barrel polishing device | IBM (patent US8932108B2, expired 2019) | 2015 (prio. 2010-04-19) | T4 | https://patents.google.com/patent/US8932108B2/en |
| [kawashin-hs-web] | 遠心バレル研磨機『HSシリーズ』 product page | Kawashin Co. (IPROS) | n.d. (accessed 2026-11-11) | T6 | https://pr.mono.ipros.com/kawashin/product/detail/2000541394 |
| [rosler-dryers-pfi] | Rösler dryers (HTZ centrifugal dryer etc.), distributor page | Precision Finishing Inc. | n.d. (accessed 2026-11-11) | T6 | https://www.precisionfinishinginc.com/rosler-dryers |

Snippet-only leads, NOT read (cite as "(snippet, unverified)" only):
- [tipton-periph-snippet] Tipton peripheral-equipment catalog (directindustry PDF, 403): lists permanent-magnet separator, inclined feeder separator, heat-suction dryer, centrifugal dryer; HS-R series "can be paired with a showering separator, rust inhibitor spray, automatic media return"; DR-12/18 centrifugal dryer "uses heater and centrifugal force". https://pdf.directindustry.com/pdf/tipton-corp/peripheral-equipment-finishing-machine/222204-917121.html
- [tipton-mm-snippet] Tipton Mighty-Mild listing names MLCC among applications; claims 60-70 % shorter time than conventional centrifugal (vendor claim). https://www.directindustry.com/prod/tipton-corp/product-222204-2284777.html

## Equipment structure

### Centrifugal (planetary) barrel — most cited for MLCC
- Turret on a horizontal revolution shaft; 4 barrels at 90 deg, offset from the shaft; each barrel turns on its own shaft opposite to the revolution (planetary). Barrels regular hexagonal hollow prisms, 3.4 L; polygon of >=5 sides allowed. Orbit radius R = 0.21 m [us9283647].
- Two rotary plates on one shaft with 4 barrel pots between them, each pot driven via a gear; pots octagonal, made of mesh/perforated member (dry type) [us6367134].
- "Horizontal centrifugal barrel machine" named for MLCC green chips [us11978592][jp2010283164a]; example container hexagonal column with urethane inner wall [jp2010283164a].
- Rotatable circular plate with several prismatic/columnar barrel containers placed eccentrically; containers may also rotate on their own shaft [us11037731].
- Turret with 4 tanks, octagonal inner section; optional elastic (rubber) collision-preventing member along each tank's axis; drive motor with pulleys and belts, speed set by inverter; whole assembly tilted by an electric servo cylinder; touch panel sets time, speed, tilt, accel/decel; tanks sealed with lids, then fixed to the turret through a sliding door closed before running. Workpieces named: "multi-layered ceramic capacitors (MLCCs), inductors, quartz oscillators" [us9687954].
- Lid fixed by clamp shaft with eccentric cam and lever; detection: dogs + proximity switch (tank in detection area) and laser emitter/receiver (clamp shaft in fixing position); if any lid is not fixed "the rotation of the turret 12 is stopped without shifting to barrel polishing"; turret runs low speed for detection, then high speed; Example 2 uses a pair of turrets on a horizontal shaft [us12103132].
- Vertical planetary type (ball-mill-like), 4 containers rotating opposite the plate, 45 deg tilted-axis embodiment, belt/pulley/gear drive; for multilayer components incl. capacitors [us8932108].
- Maker page: horizontal and vertical centrifugal barrels; vertical type "effective against chipping in hard, brittle materials", suited to ceramic capacitors; octagonal or round tanks selectable [kawashin-hs-web].

### Rotary (horizontal) barrel
- Fired chips + media balls harder than the dielectric sealed in a "small box called a barrel", barrel rotated [us10957489] (background passage); 78 rpm, 12 h example [us5712758]. Conventional horizontal process "may take twelve hours for a single batch" [us8932108].

### Vibratory barrel
- Barrel container "rotated or vibrated" [us10020117][us11049660].
- Vibration apparatus detail (used in [us10957489] for post-termination surface treatment, NOT chamfering): bottomed cylindrical agitation vessel, vibration plate on elastic members, drive motor with eccentric load, vessel tilts/vibrates without rotating so bodies follow a helical path; acceleration or laser displacement sensor feeds a motor controller; vessel coated with urethane or rubber.

### Separation, wash, dry
- Media diameter chosen smaller than end-face diagonal so "medium 20 and the multilayer body can readily be separated from each other by using a meshed sieve" [us10957489].
- "The green chips after the barrel polishing are washed with a cleaning solution, such as water, and dried" [us11978592]; wash with water and dry [jp2010283164a].
- Centrifugal dryer HTZ "ideal for stain-free drying of small parts, whilst preventing components from becoming tangled together"; other dryer types: rotary dryer with heated media, belt dryer, drum dryer; all with thermostat control [rosler-dryers-pfi] (generic mass finishing, not MLCC-specific).
- Heat-suction and centrifugal dryers, showering separator, automatic media return [tipton-periph-snippet] (snippet, unverified).

### Corner measurement
- Ra, Rb from two tangent lines La, Lb meeting at S; measured on the cross-section cut at the middle of L (plane parallel to W and T); mean of 50 samples. Cutting/polishing/microscope method not stated [us11037731].

## Step sequence
1. Position in line, option A (green chip): laminate → cut (dicing/push-cut) → optional solidify/dry → barrel polish → wash with water → dry → binder removal → firing [us11978592]; S01 laminate → S02 barrel → S03 sinter → S04 terminate [us11037731]; S04 → S05 barrel (sealed container) → S06 sinter [us11049660]; dry centrifugal on unsintered bodies, target R 70 um after sintering [us6367134].
2. Position option B (fired chip): rotary barrel on fired chips [us5712758]; dry centrifugal on sintered bodies 60 min to expose electrodes [us6367134]; barrel "one of before the sintering and after the sintering" [us10020117]; two passes (green then fired) allowed [us11037731].
3. Charging: chips + medium + liquid into barrel container [us10020117][us11049660]; container sealed [us11049660]; media optional [us11037731][jp2010283164a].
4. Mount and check: tanks lidded and clamped, fixed to turret, sliding door closed [us9687954]; low-speed detection turn, interlock, then high speed [us12103132].
5. Two-stage polish in one device: first centrifugal force C1 at tilt 30-70 deg, then C2 at tilt 0-30 deg; second embodiment pre-rotates tanks alone (clutch + separate motor) at 50 deg tilt to round corners before main polishing [us9687954].
6. Unload → separate media by meshed sieve [us10957489] → wash → dry [us11978592][jp2010283164a].
7. Check corner shape (Ra, Rb on mid-L cross-section, 50 samples) and chipping rate [us11037731].

## Parameter ranges
| parameter | value | source key | notes |
|---|---|---|---|
| Centrifugal acceleration (green MLCC) | 3.0-25 G preferred; example 3 G | [jp2010283164a] | horizontal centrifugal |
| Centrifugal acceleration, two-stage | C1 0.3-1.0 G (or 0.3-0.5), C2 1.5-6.0 G | [us9687954] | tilt 30-70 deg (40-50) then 0-30 deg |
| Centrifugal acceleration (background) | about 10 G | [us12103132] | generic workpieces |
| Relative centrifugal acceleration F (metal test) | F = 4 pi^2 N^2 R / g; 9.40-43.45 tested | [us9283647] | chain plates, not MLCC |
| Revolution / rotation speed (metal test) | N 3.333-7.167 rps; n -3.333 to -0.500 rps; n/N -1 to -0.07 | [us9283647] | rpm conversion (~200-430 rpm) is mine |
| Plate and pot speed (dry centrifugal) | 150 rpm both, same direction | [us6367134] | 2.0 x 1.2 x 1.2 mm, 1 uF |
| Sintered-body dry polish time | 60 min | [us6367134] | electrode exposure |
| Barrel time (green) | about 1-60 min | [us11037731] | |
| Barrel time tested (green) | 0, 15, 60, 360, 960 min | [jp2010283164a] | result values not in extracted text |
| Rotary barrel (fired) | 78 rpm 12 h -> R 0.13 mm; 6 h -> R 0.08 mm | [us5712758] | 2.0 x 1.25 x 0.6 mm |
| Target corner R (fired, dry centrifugal) | about 70 um | [us6367134] | |
| Media (green, centrifugal) | spherical alumina/silica 2 mm (pref. ceramic or alloy steel 1-5 mm) | [jp2010283164a] | |
| Media (green) | alumina or zirconia spheres, diameter ~0.1-0.3 x body height T | [us11037731] | optional |
| Media (rotary, fired) | 50/50 electrofused alumina + WC, 40 mesh | [us5712758] | |
| Media (centrifugal device test) | resin with dispersed abrasive grains | [us9687954] | ceramic test piece 2 x 2 x 4 mm |
| Media fill | 10-50 vol % of tank | [us9687954] | |
| Mass loading (metal test) | 50 % of barrel volume | [us9283647] | |
| Media / chip mass ratio | 0.1-6; example 500 g chips + 1000 g media | [jp2010283164a] | text also gives "16 L" liquid with a "2 L" container (inconsistent as extracted) |
| Compound | 20 g compound in 1000 cc water | [us9283647] | metal test |
| Polishing liquid (green) | water hardly soluble in organic binder | [us11037731] | |
| Liquid temperature (green) | 5-50 C, pref. 25-40 C | [jp2010283164a] | Ba-saturated solution |
| Ra / Rb results (L 1.0 x W 0.5 mm, T 40-80 um) | Ex. Ra 12.8-28.0, Rb 46.6-100.0 (units presumed um); Rb/Ra > 3.0 -> chipping 0 %; comparatives Rb/Ra 1.91-2.72 -> chipping 10-80 % | [us11037731] | 50-sample means |
| Vibration (surface treatment, not chamfer) | resonance, 23 Hz example; medium accel 2.5-20.0 G; W-based media 0.4-1.0 mm; chips <= 1/2 media volume; 5 h | [us10957489] | 1.0 x 0.5 x 0.5 mm |
| Conventional horizontal barrel time | up to 12 h per batch | [us8932108] | |

## Wet vs dry
- Wet (water) on fired bodies: water enters electrode/ceramic interface → delamination, IR drop; dry centrifugal avoids it [us6367134].
- Dry: no liquid cushion → more chipping; wet (water) on green BaTiO3 sheets: Ba2+ elutes, A/B drops, grain growth, lower withstand voltage/life → polish in Ba-saturated solution [jp2010283164a].
- Water can cause delamination in some components [us8932108].
- Green chips with attached side margins can crack/delaminate at the margin interface [us10020117]; side margins wear selectively at corners and electrodes may be exposed [us11049660].

## Gaps / unverified
- No equipment-maker MLCC process recipe (rpm, G, time, media) was readable; Tipton catalogs blocked (403). [tipton-mm-snippet] MLCC application claim unverified.
- Media separation equipment for chips (screen size, vibrating sieve type, rinse) not described in any read MLCC source beyond "meshed sieve" [us10957489].
- Dryer type actually used for MLCC chips not stated in any read MLCC source; centrifugal/heat-suction types are generic mass-finishing equipment.
- Washing equipment (tank, ultrasonic or not, rinse stages) not found.
- Cross-section preparation method for Ra/Rb (cut, resin mount, polish) not stated in [us11037731]; general FA practice.
- G values are not comparable across sources: different machines, workpieces and definitions.
- [jp2010283164a] result tables were not in the extracted text; its liquid volume vs container size looks inconsistent.
- Whether chamfering electrode-exposure is a design goal: [us6367134] (fired, dry) says yes for that process; Taiyo Yuden [us11049660] treats exposure at corners as a defect to avoid. Different chip designs.
