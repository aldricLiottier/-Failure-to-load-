<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class ArticleController extends AbstractController
{
    #[Route('/article', name: 'app_article')]
    public function index(): Response
    {
        return $this->json(['username' => 'jane.doe', 'text' => 'wala la pute elle a manger mon chat', 'createdAt' => '12.11.1998', 'updatedAt' => '13.11.1998']);
    }
}
