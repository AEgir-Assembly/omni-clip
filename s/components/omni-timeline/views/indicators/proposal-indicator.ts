import {html} from "@benev/slate"

import {light_view} from "../../../../context/slate.js"
import {calculate_effect_width} from "../../utils/calculate_effect_width.js"
import {calculate_start_position} from "../../utils/calculate_start_position.js"
import {calculate_effect_track_placement} from "../../utils/calculate_effect_track_placement.js"
import {At, ProposedTimecode, AnyEffect} from "../../../../context/controllers/timeline/types.js"

export const ProposalIndicator = light_view(use => () => {
	const controller = use.context.controllers.timeline
	const actions = use.context.actions.timeline_actions
	const zoom = use.context.state.timeline.zoom
	const {drag: {hovering, grabbed}, on_drop} = controller
	const [proposedTimecode, setProposedTimecode, getProposedTimecode] = use.state<ProposedTimecode>({
		proposed_place: {track: 0, start_at_position: 0},
		duration: null,
		effects_to_push: null
	})

	function translate_to_timecode(grabbed: AnyEffect, hovering: At) {
		const baseline_zoom = use.context.state.timeline.zoom
		const [x, y] = hovering.coordinates
		const timeline_start = (x * Math.pow(2, -baseline_zoom)) - calculate_effect_width(grabbed, 0) / 2
		const timeline_end = (x * Math.pow(2, -baseline_zoom)) - calculate_effect_width(grabbed, 0) / 2 + grabbed.duration
		const track = Math.floor(y / 40)

		return {
			timeline_start,
			timeline_end,
			track
		}
	}

	use.setup(() => on_drop(({grabbed, dropped_at}) => {
		const proposed_timecode = getProposedTimecode()
		controller.set_proposed_timecode(grabbed, proposed_timecode)
		if(dropped_at.indicator === "add-track-indicator") {actions.add_track()}
	}))

	if(hovering && grabbed) {
		const timecode = translate_to_timecode(grabbed, hovering)
		const proposed_timecode = use.context.controllers.timeline
		.calculate_proposed_timecode(
			timecode,
			grabbed!.id,
			use.context.state.timeline
		)
		setProposedTimecode(proposed_timecode)
	}

	return html`
		<div
			?data-push-effects=${proposedTimecode?.effects_to_push}
			style="
				display: ${grabbed ? "block" : "none"};
				width: ${
					proposedTimecode.effects_to_push
					? 0
					: proposedTimecode.duration
					? proposedTimecode.duration * Math.pow(2, zoom)
					: grabbed
					? calculate_effect_width(grabbed, zoom)
					: 0
				}px;
				transform: translate(
					${calculate_start_position(proposedTimecode.proposed_place.start_at_position, zoom)}px,
					${calculate_effect_track_placement(proposedTimecode!.proposed_place.track, 40)}px
				);
			"
			data-indicator="drop-indicator"
			class="drop-indicator">
		</div>
	`
})
