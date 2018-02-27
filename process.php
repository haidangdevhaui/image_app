<?php

require './vendor/autoload.php';

use Intervention\Image\ImageManagerStatic as Image;

class ImageProcess
{
    /**
     * defined output dir path
     * @var string
     */
    protected $outputDirPath = 'public/images/created';

    /**
     *  output image property
     */
    protected $outputImageWidth  = 325;
    protected $outputImageHeight = 204;
    protected $outputImageZoom   = 2;
    protected $outputImageFormat = 'jpg';

    /**
     * defined output image filename
     * @var string
     */
    protected $outputImageFileName;

    /**
     * defined background image
     * @var object
     */
    protected $backgroundImage;

    /**
     * defined frame image
     * @var object
     */
    protected $frameImage;

    /**
     * default frame image
     * @var string
     */
    protected $defaultFrameImage = 'public/images/frame_for_server.png';

    /**
     * default upload image
     * @var string
     */
    protected $defaultUploadImage = 'public/images/default.jpg';

    /**
     * defined upload image
     * @var object
     */
    protected $uploadImage;

    /**
     * defined request data
     * @var object
     */
    protected $request;

    public function __construct()
    {
        if (!empty($_POST)) {
            $this->request = $_POST;
            if (!is_dir($this->outputDirPath)) {
                mkdir($this->outputDirPath);
                chmod($this->outputDirPath, 755);
            }
        } else {
            die;
        }
    }

    /**
     * set background image
     */
    private function setBackgroundImage()
    {
        $this->backgroundImage = Image::canvas(
            $this->zoom($this->request['background']['width']),
            $this->zoom($this->request['background']['height'])
        );
    }

    /**
     * set frame image
     */
    private function setFrameImage()
    {
        $this->frameImage = Image::make($this->defaultFrameImage)
            ->resize(
                $this->zoom($this->request['frame']['width']),
                $this->zoom($this->request['frame']['height'])
            );
    }

    /**
     * set upload image
     */
    private function setUploadImage()
    {
        if (isset($_FILES['file'])) {
            $uploadImg = $_FILES['file']['tmp_name'];
        } else {
            $uploadImg = $this->defaultUploadImage;
        }
        $this->uploadImage = Image::make($uploadImg)
            ->resize(
                $this->zoom($this->request['upload']['width']),
                $this->zoom($this->request['upload']['height'])
            )
            ->rotate((Float) $this->request['upload']['rotate']);
    }

    /**
     * insert upload image into background
     */
    private function insertUploadImage()
    {
        $this->backgroundImage->insert(
            $this->uploadImage,
            'top-left',
            $this->zoom((Int) $this->request['upload']['left']),
            $this->zoom((Int) $this->request['upload']['top'])
        );
    }

    /**
     * insert frame image into background
     */
    private function insertFrameImage()
    {
        $this->backgroundImage->insert($this->frameImage, 'center');
    }

    /**
     * crop background image
     */
    private function crop()
    {
        $this->backgroundImage->crop(
            $this->zoom((Int) $this->outputImageWidth),
            $this->zoom((Int) $this->outputImageHeight)
        );
    }

    /**
     * save output image
     * @return string
     */
    public function save()
    {
        try {
            $this->setZoom();
            $this->setBackgroundImage();
            $this->setFrameImage();
            $this->setUploadImage();
            $this->insertUploadImage();
            $this->insertFrameImage();
            $this->crop();
            $this->setExtension();
            $this->generateImageFileName();
            $this->backgroundImage->save($this->outputImageFileName);
            return $this;
        } catch (\Exception $e) {
            echo json_encode(['error' => $e->getMessage()]);die;
        }

    }

    /**
     * get image output file name
     * @return string
     */
    public function getOutputImagePath()
    {
        return $this->outputImageFileName;
    }

    /**
     * generate output file name
     * @param  integer $increment
     */
    private function generateImageFileName($increment = 0)
    {
        $plus = '';
        if ($increment) {
            $plus = '(' . $increment . ')';
        }
        if (isset($this->request['file_name']) && $this->request['file_name']) {
            $this->outputImageFileName = $this->outputDirPath . '/' . trim($this->request['file_name']) . $plus . '.' . $this->outputImageFormat;
            if (file_exists($this->outputImageFileName)) {
                $increment++;
                $this->generateImageFileName($increment);
            }
        } else {
            $this->outputImageFileName = $this->outputDirPath . '/' . time() . '.' . $this->outputImageFormat;
        }
    }

    /**
     * set output image zoom
     */
    private function setZoom()
    {
        if (isset($this->request['file_zoom']) && (Int) $this->request['file_zoom'] !== 0) {
            $this->outputImageZoom = $this->request['file_zoom'];
        }
    }

    /**
     * set output image extension
     */
    private function setExtension()
    {
        if (isset($this->request['file_ext']) && preg_match('/(jpe?g|png|gif|tif|bmp|ico|psd|webp)/', $this->request['file_ext'])) {
            $this->outputImageFormat = $this->request['file_ext'];
        }
    }

    /**
     * zoom
     * @param  integer $size
     * @return integer
     */
    private function zoom($size, $zoom = 1)
    {
        if ($zoom !== 1 && is_integer($zoom)) {
            return $size * $zoom;
        }
        return $size * $this->outputImageZoom;
    }
}
echo json_encode(['path' => (new ImageProcess)->save()->getOutputImagePath()]);die;
