import React, { useState, useEffect } from 'react';
import { ColorPicker } from '../ColorComponents';

const Content = (props) => {
	return (
		<div className="content">
			<div className="flex column">
				<div>
					<label>Power</label>
					<button>On</button>
					<button>Off</button>
				</div>
				<div>
					<label>Autoplay</label>
					<button>On</button>
					<button>Off</button>
				</div>
				<ColorPicker />

				<label for="red">Red</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="red" />
				<label for="green">Green</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="green" />
				<label for="blue">Blue</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="blue" />

				<label for="brightness">Brightness</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="brightness" />
				<label for="autoplay_duration">Autoplay Duration</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="autoplay_duration" />
				<label for="speed">Speed</label>
				<input type="range" min="0" max="255" defaultValue="50" className="slider" name="speed" />
				<label for="pattern">Pattern</label>
				<select type="range" min="0" max="255" defaultValue="50" className="slider" name="pattern" />
				<label for="palette">Palette</label>
				<select type="range" min="0" max="255" defaultValue="50" className="slider" name="palette" />
				<button>Reset</button>
			</div>
		</div>
	);
};

export default Content;
