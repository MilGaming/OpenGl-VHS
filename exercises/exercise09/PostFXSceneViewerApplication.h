#pragma once

#include <ituGL/application/Application.h>

#include <ituGL/scene/Scene.h>
#include <ituGL/texture/FramebufferObject.h>
#include <ituGL/renderer/Renderer.h>
#include <ituGL/camera/CameraController.h>
#include <ituGL/utils/DearImGui.h>
#include <array>
#include <vector>
#include <memory>
#include <filesystem>

class Texture2DObject;
class TextureCubemapObject;
class Material;

class PostFXSceneViewerApplication : public Application
{
public:
    PostFXSceneViewerApplication();

protected:
    void Initialize() override;
    void Update() override;
    void Render() override;
    void Cleanup() override;

private:
    void InitializeCamera();
    void InitializeLights();
    void InitializeMaterials();
    void InitializeModels();
    void InitializeFramebuffers();
    void InitializeRenderer();

    std::shared_ptr<Material> CreatePostFXMaterial(const char* fragmentShaderPath, std::shared_ptr<Texture2DObject> sourceTexture = nullptr);

    Renderer::UpdateTransformsFunction GetFullscreenTransformFunction(std::shared_ptr<ShaderProgram> shaderProgramPtr) const;

    void RenderGUI();

private:
    // Helper object for debug GUI
    DearImGui m_imGui;

    // Camera controller
    CameraController m_cameraController;

    // Global scene
    Scene m_scene;

    // Renderer
    Renderer m_renderer;

    // Skybox texture
    std::shared_ptr<TextureCubemapObject> m_skyboxTexture;

    // Materials
    std::shared_ptr<Material> m_defaultMaterial;
    std::shared_ptr<Material> m_deferredMaterial;
    std::shared_ptr<Material> m_composeMaterial;
    std::shared_ptr<Material> m_bloomMaterial;
    //scanlines
    std::shared_ptr<Material> m_scanlinesMaterial;
	//vignetting
	std::shared_ptr<Material> m_vignetteMaterial;
	//chromatic aberration
	std::shared_ptr<Material> m_chromaticAbMaterial;
    //fog effect
	std::shared_ptr<Material> m_fogMaterial;
    //noise
	std::shared_ptr<Material> m_noiseMaterial;
	//tv screen
	std::shared_ptr<Material> m_tvScreenMaterial;
	//barrel
	std::shared_ptr<Material> m_barrelMaterial;

    // Framebuffers
    std::shared_ptr<FramebufferObject> m_sceneFramebuffer;
    std::shared_ptr<Texture2DObject> m_depthTexture;
    std::shared_ptr<Texture2DObject> m_sceneTexture;
    std::array<std::shared_ptr<FramebufferObject>, 4> m_tempFramebuffers;
    std::array<std::shared_ptr<Texture2DObject>, 4> m_tempTextures;

    // Configuration values
    float m_exposure;
    float m_contrast;
    float m_hueShift;
    float m_saturation;
    glm::vec3 m_colorFilter;
    int m_blurIterations;
    glm::vec2 m_bloomRange;
    float m_bloomIntensity;
	
    //Scanlines
	float m_scanlinesIntensity;
	float m_scanlinesLineDensity;
    float m_elapsedTime = 0.0f;
    
	//Vignetting
	float m_vignettingIntensity;
    float m_vignettingSmoothness;

	//chromatic aberration
    float m_abAmount;

    //barrel
    float m_distortion;
};
