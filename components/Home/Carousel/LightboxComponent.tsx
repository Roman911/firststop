import LightboxComponent, {
	LightboxExternalProps,
} from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";
import Inline from 'yet-another-react-lightbox/plugins/inline';
import Slideshow from 'yet-another-react-lightbox/plugins/slideshow';
import * as React from 'react';

/**
 * The purpose of this intermediate component is to load the Lightbox and
 * its CSS dynamically only when the lightbox becomes interactive
 */
export default function Lightbox(
	props: Omit<LightboxExternalProps, "plugins">
) {

	return (
		<>
			<LightboxComponent
				// add plugins here
				plugins={[Inline, Slideshow]}
				{...props}
			/>
		</>
	);
}
