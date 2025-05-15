layout(location = 0) in vec3 VertexPosition;
layout(location = 1) in vec2 VertexTexCoord;

uniform mat4 WorldViewProjMatrix;

out vec2 FragUV;

// This is the vertex shader for the TV screen effect.
void main() {
    FragUV = VertexTexCoord;
    gl_Position = WorldViewProjMatrix * vec4(VertexPosition, 1.0);
}
