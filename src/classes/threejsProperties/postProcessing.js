const PostProcessing = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: null },
    pisxelSize: { value: 1 },
    time: { value: 0 },
  },

  vertexShader: `
  varying highp vec2 vUv;

		void main() {
      vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,

  fragmentShader: `
     uniform sampler2D tDiffuse;
      uniform float pixelSize;
      uniform vec2 resolution;
      uniform float time;

      varying highp vec2 vUv;

      float hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }

      void main() {
        vec3 color;
        vec4 t = texture2D(tDiffuse, vUv);

        color = vec3(t.r + t.b + t.g)/20.;
        float val = hash(vUv + time)*0.3;
        vec3 cResult = t.rgb + t.rgb * clamp( 0.1 + val, 0.0, 1.0 );
        // cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );


        vec2 dxy = pixelSize / resolution;
        vec2 coord = dxy * floor(vUv / dxy);
        gl_FragColor = vec4( vec3(val), 1. );
        // gl_FragColor = t;
        gl_FragColor = vec4(cResult + vec3(val), 1.);
        // gl_FragColor = texture2D(tDiffuse, vUv);
		}`,
}

export default PostProcessing
