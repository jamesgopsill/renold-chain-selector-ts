import { expect, test } from "bun:test"
import {
	ChainCriteria,
	getChainOptions,
	ProductRange,
	Standard,
} from "../src/index.js"

test("Valid Criteria", async () => {
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
	expect(r.ok).toBe(true)
	if (r.status == 200) {
		const data = await r.json()
		console.log(data)
		expect(data.status).toEqual("ChainsAvailable")
	} else {
		console.log(r.status, r.text())
	}
})

test("Invalid Criteria", async () => {
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
		centreDistanceRoundingMode: "FixedValue",
		centreDistance: 0,
		numberOfLinks: 20,
		userSuppliedNumberOfLinks: false,
		drivingMachineCharacteristics: "SmoothRunning",
		drivenMachineCharacteristics: "HeavyShocks",
		lubricationRegime: "MaintenanceFreeNoLubrication",
		customWearFactor: 0,
		environmentCondition: "Normal",
		environmentDomain: "Indoor",
		productRangeId: ProductRange.RENOLD_SYNO_POLYMER_BUSH,
		chainStandardId: Standard.BRITISH,
		unit: "Metric",
	}

	const r = await getChainOptions(chainCriteria)
	expect(r.ok).toBe(true)
	if (r.status == 200) {
		const data = await r.json()
		console.log(data)
		expect(data.status).toEqual("NoChainsConditionsTooHarsh")
	} else {
		console.log(r.status, r.text())
	}
})
