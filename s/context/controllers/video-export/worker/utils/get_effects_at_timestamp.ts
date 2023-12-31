import {AnyEffect} from "../../../timeline/types.js"
import {sort_effects_by_track} from "./sort_effects_by_track.js"

export function get_effects_at_timestamp(effects: AnyEffect[], timestamp: number) {
	const filtered_effects = effects.filter(effect => effect.start_at_position <= timestamp && effect.start_at_position + effect.duration >= timestamp)
	const sorted_by_track = sort_effects_by_track(filtered_effects)
	return sorted_by_track.length > 0 ? sorted_by_track : undefined
}
