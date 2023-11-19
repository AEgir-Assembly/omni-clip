import {css} from "@benev/slate"

export const styles = css`
	.text-input {
		background: transparent;
		border: none;
		position: absolute;
	}

	.text-input:focus {
		outline: none;
	}

	.text-editor {
		border: solid white 1px;
		padding: 0.5rem;
	}

	.video-canvas{
		position: relative;
		width: 600px;
		height: 400px;
		border: 0.25em solid red;
	}
`
