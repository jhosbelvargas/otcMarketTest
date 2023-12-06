import { useFacebook } from 'react-facebook';

function FacebookPostButton() {
  const { handleClick, isReady } = useFacebook();

  const handlePost = async () => {
    // Verificar si el SDK de Facebook está listo
    if (!isReady) {
      return;
    }

    try {
      // Iniciar sesión con Facebook (debes solicitar los permisos necesarios)
      const response = await handleClick();

      // Publicar en el muro del usuario
      const postData = { message: '¡Hola, esto es un mensaje de prueba desde mi aplicación!' };
      const postResponse = await window.FB.api('/me/feed', 'post', postData);

      console.log('Publicación exitosa con el ID:', postResponse.id);
    } catch (error) {
      console.error('Error al publicar:', error);
    }
  };

  return (
    <button onClick={handlePost}>
      Publicar en Facebook
    </button>
  );
}

export default FacebookPostButton;