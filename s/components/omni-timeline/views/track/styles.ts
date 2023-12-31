import {css} from "@benev/slate"

export const styles = css`
	.track {
		background: #0a0a0a;
		display: flex;
		height: 40px;
		outline: 1px solid gray;
	}

	.indicators {
		width: 100%;
		position: relative;

		& .indicator-area {
			position: absolute;
			width: 100%;
			height: 14px;
			top: -7px;
			z-index: 3;
		}

		& .indicator {
			display: none;
			z-index: 1;
			position: relative;
			align-items: center;
			width: 100%;
			outline: 1px solid green;

			&[data-indicate] {
				display: flex;
				background: #0080002e;

				& .plus {
					color: #028100;
					left: 50vw;
					position: absolute;
					background: #1c1c1c;
					width: 20px;
					border-radius: 15px;
					display: flex;
					justify-content: center;
				}

			}
		}
	}
`
