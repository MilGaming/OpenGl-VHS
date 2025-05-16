in vec2 TexCoord;
out vec4 FragColor;

uniform sampler2D SourceTexture;
uniform float LineDensity;
uniform float Intensity;
uniform float Time;

// Code for the scanline effect, to help make it look like a old camera recording
void main()
{
    vec4 col = texture(SourceTexture, TexCoord);

    // scroll speed: stripes per second
    float speed = 0.5;
    float y = fract(TexCoord.y * LineDensity - Time * speed);

    // make each stripe cover 80% of its cell:
    float mask = step(0.1, y) - step(0.9, y);

    // tint inside the fat band
    col.rgb = mix(col.rgb, vec3(0,0,0), mask * Intensity);

    FragColor = col;
}