in vec2 TexCoord;
out vec4 FragColor;

uniform sampler2D SourceTexture;
uniform float VignetteIntensity;
uniform float VignetteSmoothness;

// Code for the vignette effect, to darken the corners of the screen
void main()
{
    // sample your scene
    vec4 color = texture(SourceTexture, TexCoord);

    // remap TexCoord [0,1]→[-1,1] so center is (0,0)
    vec2 pos = TexCoord * 2.0 - 1.0;

    // compute distance from center (0=center, √2=corner)
    float d = length(pos);

    // create a smooth mask: start darkening around d0, fully dark by d1
    float d0 = 1.0 - VignetteSmoothness;
    float d1 = 1.0;
    float vignette = smoothstep(d0, d1, d);

    // darken by mixing to black
    color.rgb *= mix(1.0, 1.0 - VignetteIntensity, vignette);

    FragColor = color;
}
