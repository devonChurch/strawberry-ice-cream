import React, {PropTypes} from 'react';

function setAllegianceName(props) {

	switch (props.isFetched) {

		case true:
			return props.isAutobot ? 'autobot' : 'decepticon';

		default:
			return 'unknown';

	}

}

function setAllegianceClass(props) {

	switch (props.isFetched) {

		case true:
			return props.isAutobot ? 'isAutobot' : 'isDecepticon';

		default:
			return false;

	}

}

function TransformerItem(props) {

	const handleClick = props.isFetched || props.isFetching ? (e) => e.preventDefault() : props.handleClick;

    return (
		<a
			className={`TransformerItem ${props.isFetched && 'isFetched'} ${setAllegianceClass(props)}`}
			href="#"
			onClick={handleClick}>

			<div className="TransformerItem-logoContainer">

				<svg
					className="TransformerItem-autobotLogo"
					viewBox="0 0 770 770">
					<path d="M392.1,23.2c-2.3,0-4.7,0-7,0c-2.4,0-4.8,0-7.1,0c-148.4,0.4-232.1,45.3-232.1,45.3l20.7,61.1l218.4,96l218.5-96l20.7-61.1 C624.1,68.5,540.4,23.5,392.1,23.2z M385,153.7c-0.4-0.1-54.1-21.2-82.8-48.1c0,0,26.6-16.4,77.8-17.1c1.7,0,3.3,0,5,0 c54.4-0.3,82.7,17.1,82.7,17.1C439.1,132.5,385.4,153.6,385,153.7z"/>
					<path d="M294.9,210.8l-147-64.5l-30.3-93.6l-87.2-4.3l42.3,233.3l97,70.5l145.7,0.4L294.9,210.8z M98.3,154.7l156.1,71l5.8,28.4 l-155.8-69.7L98.3,154.7z M115.5,246.4l-6.2-29.7l156.1,71l5.8,28.4L115.5,246.4z"/>
					<path d="M652.5,52.7l-30.3,93.6l-147,64.5l-20.5,141.9l145.7-0.4l97-70.5l42.3-233.3L652.5,52.7z M654.5,246.4l-155.8,69.7l5.8-28.4 l156.1-71L654.5,246.4z M665.5,184.3l-155.8,69.7l5.8-28.4l156.1-71L665.5,184.3z"/>
					<polygon points="320.3,221.8 344.9,357.2 344.9,564.1 425.1,564.1 425.1,357.2 449.7,221.8 385,249.8 "/>
					<polygon points="76.7,311.5 101.8,643.4 231.5,696.7 231.5,465.7 148.3,419 131.2,351.7 "/>
					<polygon points="693.3,311.5 638.8,351.7 621.7,419 538.5,465.7 538.5,696.7 668.2,643.4 "/>
					<polygon points="322.8,412.9 254.8,463.6 254.8,707 300.1,724.2 317.8,621.5 452.2,621.5 469.9,724.2 515.2,707 515.2,463.6  447.3,412.9 447.3,587.2 322.8,587.2 "/>
					<polygon points="336.2,644.1 319,746.8 385.1,746.8 451,746.8 433.8,644.1 "/>
				</svg>

				<svg
					className="TransformerItem-decepticonLogo"
					viewBox="0 0 770 770">
					<path d="M657,156.7l-151,44.2l-17.3,68.6l148.7-44.2l-5.8,16l-149.8,44.2l-11.5,44.2l163.7-49.8l-1.2,15.1 l-167.1,50.8L385,413.4l-80.7-67.7l-167.1-50.8l-1.2-15.1l163.7,49.8l-11.5-44.2l-149.8-44.2l-4.6-16l147.5,44.2L264,200.9 l-151-44.2L35.8,52.4l48.4,299L385,717l300.8-365.7l48.4-299L657,156.7z M319.3,504.5L155.7,364.5l204,63.9L319.3,504.5z M450.7,504.5l-40.3-76.2l204-63.9L450.7,504.5z"/>
					<path d="M415,179.8h-30h-30L264,56.6l57.6,278.2l63.4,55.5l63.4-55.5L506,56.6L415,179.8z M385,303.8l-23.1-69.6H385 h23.1L385,303.8z"/>
					<polygon points="92.5,385.9 129.8,615.9 366.4,717.6 "/>
					<polygon points="677.5,385.9 403.6,717.6 640.2,615.9 "/>
				</svg>

			</div>

			<h2
				className="TransformerItem-name"
				data-transformer-name={props.name}>
				{props.name}
			</h2>

			<p
				className="TransformerItem-allegiance"
				data-transformer-allegiance={setAllegianceName(props)}>
				{setAllegianceName(props)}
			</p>

		</a>
    );

}

export default TransformerItem;
