export enum Standard {
	BRITISH = "b658ec94-ed00-452a-8d41-b2863a3677a1",
	AMERICAN = "3cfa4589-df43-4e26-9e28-84d8fb744d82",
}

export enum ProductRange {
	"SYNERGY" = "ba1d2ddf-90b0-430e-9ac0-87a3a6c17f21",
	"A&S" = "4bb164c1-57e1-48cb-91c9-21976be42686",
	"RENOLD" = "05162c4b-2e1d-42af-8d24-c015a8800564",
	"RENOLD_HYDRO_SERVICE" = "b6d55166-7bd8-448d-9444-e9d58c8cc6e2",
	"RENOLD_SOVEREIGN" = "e34a716a-07f7-48d6-af17-55e1561c314c",
	"RENOLD_STAINLESS_STEEL" = "4707b9e7-352d-4538-a2b7-540436912a04",
	"RENOLD_SYNO_NICKEL_PLATED" = "9f82d5b0-f760-4a2e-b7c8-0adbfc9b1e51",
	"RENOLD_SYNO_POLYMER_BUSH" = "496ae054-8404-438d-9fc0-4100774b1cfb",
}

export interface ChainCriteria {
	powerValueType: "InputPower" | "WorkingLoad" | "Torque"
	powerValue: number
	speedValueType: "InputSpeed" | "ChainLinearVelocity"
	speedValue: number
	startSpeed: number
	finishSpeed: number
	speedIncrement: number
	targetWorkingLife: number
	workingLifeTolerance: number
	drivingSprocketTeeth: number
	drivenSprocketTeeth: number
	centreDistanceRoundingMode:
		| "EvenNumberOfLinks"
		| "OddNumberOfLinks"
		| "FixedValue"
		| "None"
	centreDistance: number
	numberOfLinks: number
	userSuppliedNumberOfLinks: boolean
	drivingMachineCharacteristics:
		| "SmoothRunning"
		| "SlightShocks"
		| "ModerateShocks"
	drivenMachineCharacteristics:
		| "SlightShocks"
		| "ModerateShocks"
		| "HeavyShocks"
	lubricationRegime:
		| "DryRunning"
		| "Insufficient"
		| "Recommended"
		| "MaintenanceFreeNoLubrication"
		| "RegularRelubrication"
		| "BetterThanRecommended"
	customWearFactor: number
	environmentCondition: "Normal" | "Abrasive"
	environmentDomain: "Indoor" | "Outdoor"
	productRangeId: string
	chainStandardId: string
	unit: "Metric" | "Imperial"
}

export interface DamageEvent {
	hours: number
	description: string
	type: number
}

export interface ChainOption {
	chainDetails: {
		chainId: string
		productRangeId: string
		chainPartNumber: string
		chainSize: string
		strandCount: number
		strandCofiguration: string
		pitch: string
		isIsoBreakingLoad: boolean
		weight: string
		bearingArea: string
	}
	workingLifeDetails: {
		workingLifeHours: string
		numberOfCycles: string
		minimumAcceptableWorkingLifeHours: number
		maximumDisplayableWorkingLifeHours: number
		damageEvents: DamageEvent[]
		workingLifeHoursIsGreaterThanMaximumDisplayableWorkingLifeHours: boolean
	}
	calculatedValues: {
		inputPower: string
		inputSpeed: string
		chainLinearVelocity: string
		torque: string
		staticForce: string
		dynamicForce: string
		centrifugalForce: string
		totalForce: string
		bearingPressure: string
		breakingLoad: string
		length: string
		staticSafetyFactor: string
		dynamicSafetyFactor: string
		recommendedLubrication: string
	}
	extendedCalculatedValues: unknown
	applicationDetails: {
		numberOfLinks: string
		drivingSprocketTeeth: number
		drivingSprocketLoadingClassification: string
		drivingSprocketPitchDiameter: string
		drivenSprocketTeeth: number
		drivenSprocketLoadingClassification: string
		drivenSprocketPitchDiameter: string
		sprocketRatio: string
		environmentCondition: string
		environmentDomain: string
		lubricationRegime: string
		centreDistance: string
		numberOfLinksNotes: string
		centreDistanceNotes: string
	}
	units: {
		inputPowerUnit: string
		inputSpeedUnit: string
		chainLinearVelocityUnit: string
		torqueUnit: string
		staticForceUnit: string
		dynamicForceUnit: string
		centrifugalForceUnit: string
		totalForceUnit: string
		normalisedTotalForceUnit: string
		bearingPressureUnit: string
		pitchUnit: string
		breakingLoadUnit: string
		fatigueLimitUnit: string
		bearingAreaUnit: string
		weightUnit: string
		lengthUnit: string
		centreDistanceUnit: string
		pitchDiameterUnit: string
	}
	bearingPressureLimitCheckStatus: "Ok" | string
	linearChainVelocityLimitCheckStatus: "Ok" | string
}

export interface ChainOptions {
	status:
		| "ChainsAvailable"
		| "NoChainsChainNotLongEnough"
		| "NoChainsConditionsTooHarsh"
		| string
	recommendations: ChainOption[]
}

// https://stackoverflow.com/questions/68008673/typescript-any-number-except-x

export type HTTPStatusCode = 200 | 204 | 400 | 404 | 500 | 503

export type ChainResponse =
	| ({
			ok: true
			status: 200
			json: () => Promise<ChainOptions>
	  } & Response)
	| ({
			status: Exclude<HTTPStatusCode, 200>
	  } & Response)

export const validateChainCriteria = () => {}

export const getChainOptions = (chainCriteria: ChainCriteria) => {
	const url: string =
		"https://www.renoldchainselector.com/ChainSelector/FindRecommendations?"

	const urlParams: URLSearchParams = new URLSearchParams()
	for (const [key, value] of Object.entries(chainCriteria)) {
		urlParams.set(key, value)
	}
	// Perform only automatic selection for now
	urlParams.set("chainSelectionMode", "Automatic")
	urlParams.set("customMinimumAcceptableWorkingLifeHours", "0")
	urlParams.set("customFatigueLimitCorrectionFactor", "0")
	urlParams.set("customFatigueLimit", "0")
	urlParams.set("customBreakingLoad", "0")
	urlParams.set("noCache", "0")
	urlParams.set("outputMode", "Json")
	urlParams.set("manualChainSelectionStrandCount", "NaN")
	urlParams.set("manualChainSelectionSize", "")

	const fullUrl = url + urlParams.toString()

	return fetch(fullUrl) as Promise<ChainResponse>
}
