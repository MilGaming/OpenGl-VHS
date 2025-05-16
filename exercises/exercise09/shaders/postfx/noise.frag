in  vec2 TexCoord;
out vec4 FragColor;

uniform sampler2D SourceTexture;
uniform float Time;

// Code for the noise effect, to make film grain of a old movie
float noise(vec2 p) {
    return fract(sin(dot(p ,vec2(12.9898,78.233))) * 43758.5453);
}

void main()
{
    float NoiseIntensity = 0.05f;

    vec3 sceneColor = texture(SourceTexture, TexCoord).rgb;
    float n = noise(TexCoord);

    // Blend noise with the scene
    vec3 finalColor = sceneColor + n * NoiseIntensity;

    FragColor = vec4(finalColor, 1.0f);
}