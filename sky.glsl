const SkyFrag04=´
  varying vec2 vUv;
  uniform vec3 sunPosition;
  uniform float clouds;
  uniform float humidity;
  uniform float rain;
  uniform float moon;

  const float PI = acos(0.) * 2.;

  #define clip(x) clamp(x,0.,1.)
  #define atan_n(x, w, h) 0.5 + atan( h * ( x - w ) ) / PI

  const vec2 sunPos = vec2(0.1);
  const vec3 sunCol = vec3(1.0, 0.4, 0.05);
  const vec3 atmCol = vec3(0.36,0.6,1.0);
  const vec3 sunExt = vec3(-0.018, -0.06, -0.12);

  void main(){
    float i = sunPosition.y;
    vec2 uv = 1. - vUv * vUv;
    vec3 atm = atmCol;
    vec3 sun = sunCol;

    vec3 sl = atan_n(i, sunExt, 72.);
    vec3 sl2 = sl.y * atan_n(i, vec3(0.018, 0.0, -0.018), 28.);
    float tw = 0.64 * humidity + (1.)/(i * i * 72. + 1.);

    vec3 cZen = clip(sl.y * atm);
    vec3 cHor = clip(tw * sl2.zyx + sl.x * atm);

    // Output to screen
    //gl_FragColor = vec4(cHor, 1.0 );
    gl_FragColor = vec4( mix( cZen,cHor, uv.y), 1.0 );
  }
´


