in vec2 FragUV;

uniform float Time;
uniform vec2 Resolution;

out vec4 FragColor;

// to simulate a TV screen noise
float Noise21(vec2 p, float ta, float tb) {
    return fract(sin(dot(p, vec2(ta,tb))) * 5678.0);
}

void main() {
    vec2 uv = FragUV;

    float t  = Time + 123.0;
    float ta = t * 0.654321;
    float tb = t * (ta * 0.123456);

    float c  = Noise21(uv, ta, tb);
    FragColor = vec4(vec3(c), 1.0);
}
