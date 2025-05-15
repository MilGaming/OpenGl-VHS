in vec2 TexCoord;
out vec4 FragColor;

uniform sampler2D SourceTexture;
uniform float Distortion;

//Code for the battellens effect, so it looks like you are looking through a camera lens
void main() {
    // remap [0,1]→[-1,1]
    vec2 uv = TexCoord * 2.0 - 1.0;

    // radial distortion factor
    float r2 = dot(uv, uv);
    float k  = 1.0 + Distortion * r2;

    // apply and remap back
    vec2 warped = uv * k * 0.5 + 0.5;

    // outside is black, rest is see-through
    if (warped.x < 0.0 || warped.x > 1.0 ||
        warped.y < 0.0 || warped.y > 1.0) {
        FragColor = vec4(0.0);
    } else {
        FragColor = texture(SourceTexture, warped);
    }
}
