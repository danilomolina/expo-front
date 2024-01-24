export function getImageDimensions(windowWidth: number) {
    let imageWidth;

    if (windowWidth >= 1440 || windowWidth >= 1194) {
      // Se a largura da tela for maior ou igual a 1440, use 150
      imageWidth = 150;
    } else if (windowWidth >= 430) {
      // Se a largura da tela for maior ou igual a 430, use 310
      imageWidth = 350;
    } else {
      // Para todas as outras larguras, use 350
      imageWidth = 310;
    }

    return imageWidth;
  }
