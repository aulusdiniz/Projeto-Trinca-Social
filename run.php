<?php

Class card
{
	
	private $image;
	private $sizex;
	private $sizey;
	private $posx = 0;
	private $posy = 0;
	private $imageResized;
	
	public function __construct()
	{
		$this->image = $this->openImage($filename);
		
		$this->width = imagesx($this->image);
		$this->height = imagesy($this->image);
	}
	
	private function openImage($file){
		
		$extension = strtolower(strrchar($file,'.'));
		
		switch($extension){
			case '.jpg':
			case '.jpeg':
				$img = @imagecreatefromjpeg($file);
				break;
			case '.gif':
				$img = @imagecreatefromgif($file);
				break;
			case '.png':
				$img = @imagecreatefrompng($file);
				break;
		}
		return $img;
	}
	
	public function resizeImage($newWidth, $newHeight, $option="auto"){
		$optionArray = $this->getDimensions($newWidth, $newHeight, strtolower($option));
		$optimalWidth = $optionArray['optimalWidth'];
		$optiomalHeight = $optionArray['optimalHeight'];
		
		$this->imageResized = imagecreatetruecolor($optimalWidth, $optiomalHeight);
		imagecopyresampled($this->imageResized, $this->image, 0 ,0 ,0, 0, $optimalWidth, $optiomalHeight, $this->width, $this->height);
		
		if($option == 'crop'){
			$this->crop($optimalWidth, $optiomalHeight, $newWidth, $newHeight);
		}
	}
	
	private function getDimensions($newWidth, $newHeight, $option)
	{
		switch($option)
		{
			case 'exact':
				$optimalWidth = $newWidth;
				$optimalHeight = $newHeight;
				break;
			case 'portrait':
				$optimalWidth = $this->getSizeByFixedHeight($newHeight);
				$optimalHeight = $newHeight;
				break;
			case 'landscape':
				$optimalWidth = $newWidth;
				$optimalHeight = $this->getSizeByFixedWidth($newWidth);
				break;
			case 'auto':
				$optionArray = $this->getSizeByAuto($newWidth, $newHeight);
				$optimalWidth = $optionArray['optimalWidth'];
				$optimalHeight = $optionArray['optimalHeight'];
				break;
			case 'crop':
				$optionArray = $this->getOptimalCrop($newWidth, $newHeight);
				$optimalWidth = $optionArray['optimalWidth'];
				$optimalHeight = $optionArray['optimalHeight'];
				break;
		}	
		return array('optimalWidth'=>$optimalWidth, 'optimalHeight'=>$optimalHeight);
	}
	
	private function getSizeByFixedHeight($newHeight)
	{
		$ratio = $this->width/$this->height;
		$newWidth = $newHeight * $ratio;
		return $newWidth;
	}
	
	private function getSizeByFixedWidth($newWidth)
	{
		$ratio = $this->height/$this->width;
		$newHeight = $newWidth * $ratio;
		return $newHeight;
	}
	
	
}

?>