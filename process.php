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
            $this->request['background']['width'],
            $this->request['background']['height']
        );
    }

    /**
     * set frame image
     */
    private function setFrameImage()
    {
        $this->frameImage = Image::make($this->defaultFrameImage)
            ->resize($this->request['frame']['width'], $this->request['frame']['height']);
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
            ->resize($this->request['upload']['width'], $this->request['upload']['height'])
            ->rotate(-(Float) $this->request['upload']['rotate']);
    }

    /**
     * insert upload image into background
     */
    private function insertUploadImage()
    {
        $this->backgroundImage->insert(
            $this->uploadImage,
            'top-left',
            (Int) $this->request['upload']['left'],
            (Int) $this->request['upload']['top']
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
            (Int) $this->request['frame']['width'],
            (Int) $this->request['frame']['height']
        );
    }

    /**
     * save output image
     * @return string
     */
    public function save()
    {
        try {
            $this->setBackgroundImage();
            $this->setFrameImage();
            $this->setUploadImage();
            $this->insertUploadImage();
            $this->insertFrameImage();
            $this->crop();
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
            $this->outputImageFileName = $this->outputDirPath . '/' . trim($this->request['file_name']) . $plus . '.jpg';
            if (file_exists($this->outputImageFileName)) {
                $increment++;
                $this->generateImageFileName($increment);
            }
        } else {
            $this->outputImageFileName = $this->outputDirPath . '/' . time() . '.jpg';
        }
    }
}

// (new ImageProcess)->save()->download();die;
echo json_encode(['path' => (new ImageProcess)->save()->getOutputImagePath()]);die;
