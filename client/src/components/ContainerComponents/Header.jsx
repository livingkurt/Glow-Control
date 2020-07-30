import React, { useState, useEffect } from 'react';

const Header = (props) => {
	return (
		<header>
			<img
				className="zoom logo"
				height="75px"
				src="/images/optimized_images/logo_images/glow_logo_optimized.png"
				alt="Glow LEDs"
			/>
			<h1>Glow Control</h1>
		</header>
	);
};

export default Header;
