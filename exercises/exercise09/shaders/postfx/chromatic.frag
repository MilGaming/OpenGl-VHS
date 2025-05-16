in vec2 TexCoord;
out vec4 FragColor;

uniform sampler2D SourceTexture;
uniform float AbAmount;

//Code for the chromatic aberration effect, giving it a retro look
void main() {
    // center-origin coords in range [–1.1]
    vec2 centered = TexCoord * 2.0 - 1.0;

    // compute offset based on distance from center
    float dist = length(centered);
    vec2 dir = centered / dist;
    float offset = dist * AbAmount;

    // sample each channel slightly shifted
    vec2 uvR = TexCoord + dir * offset;
    vec2 uvG = TexCoord;
    vec2 uvB = TexCoord - dir * offset;

    float r = texture(SourceTexture, uvR).r;
    float g = texture(SourceTexture, uvG).g;
    float b = texture(SourceTexture, uvB).b;
    
    FragColor = vec4(r, g, b, 1.0);

}