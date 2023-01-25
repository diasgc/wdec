Sky.fragment04=´
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
    float ii = i - 0.06;

    float grey = clamp(0.8 - 0.2 * rain, 0.4, 0.8);
    // att 0=cloudy 1=clear
    float att = 1. - clip( rain + pow(clouds,10.));
    vec3 atm = mix(vec3(grey), atmCol, att);
    vec3 sun = mix(vec3(grey + 0.1), sunCol, att);
    
    vec3 sl = atan_n(i, sunExt, 72.);
    float tw = att/(ii * ii * 216. + 1.);
    float tw2 = 1. * att/(i * i * 216. + 1.);
    vec3 sc = clip( sl.zyx * 20. * sun );
      
    vec3 cZen = clip(sl.y * 0.22 * sc + sl.y * atm);
    vec3 cHor = clip(tw * sc * 0.22 + 0.52 * tw2 * sun + sl.z * atm);
  
    gl_FragColor = vec4( mix( cZen,cHor,  uv.y), 1.0 );
  }
´
