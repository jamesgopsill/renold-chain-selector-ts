# (Unnofficial) Renold Chain Selector TS client

This repo contains the source code for an unofficial typescript wrapper around the [Renold Chain Selector](https://www.renoldchainselector.com/ChainSelector) online tool. The primary goal is to aid in integrating this fantastic tool into engineering design workflows and we use it within our courses to teach our students about design automation.

## Installation

To install, use your preferred node package manager.

```
> bun install @jamesgopsill/renold-chain-selector
```

## Example

```ts
const chainCriteria: ChainCriteria = {
	powerValueType: "InputPower",
	powerValue: 10,
	speedValueType: "InputSpeed",
	speedValue: 1_000,
	startSpeed: 1,
	finishSpeed: 1000,
	speedIncrement: 10,
	targetWorkingLife: 15_000,
	workingLifeTolerance: 100,
	drivingSprocketTeeth: 19,
	drivenSprocketTeeth: 19,
	centreDistanceRoundingMode: "EvenNumberOfLinks",
	centreDistance: 900,
	numberOfLinks: 0,
	userSuppliedNumberOfLinks: false,
	drivingMachineCharacteristics: "SlightShocks",
	drivenMachineCharacteristics: "ModerateShocks",
	lubricationRegime: "Insufficient",
	customWearFactor: 0,
	environmentCondition: "Normal",
	environmentDomain: "Indoor",
	productRangeId: ProductRange.SYNERGY,
	chainStandardId: Standard.BRITISH,
	unit: "Metric",
}

const r = await getChainOptions(chainCriteria)
if (r.ok) {
	const results = await r.json()
}
```

## Docs

The docs have been produced using [TypeDoc](https://typedoc.org/) and can be accessed [here](https://jamesgopsill.github.io/renold-chain-selector-ts/). If you enter the IP address of your machine in your browser window then that will take you to the API documentation.
