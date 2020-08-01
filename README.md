# English


## Installation

1. Create your own repository (https://github.com/new)
  Fill in the `Repository name` and copy the link to the created repository
2. Open the console
  - Clone the repository https://github.com/xepozz/blogit to the folder with your project: `git clone https://github.com/xepozz/blogit /path/to/projects/{repository_name}`
  - Change the remote repository to your own:
     * `cd /path/to/projects/{repository_name}`
     * `git remote set-url origin https://github.com/{username}/{repository_name}`
      
           /path/to/projects/ - path to the folder with projects
           {username} - the name of your account on Github
           {repository_name} - name of the created repository

### Update

Implemented an update system using [bash utility](https://github.com/xepozz/blogit/blob/master/tools/update). <br/>
If you want, you can sync your local repository with the https://github.com/xepozz/blogit repository. <br/>
Usually this is needed to pull some innovation in the main project repository. <br/>

The command `./tool/update` (from the folder with the project) will merge all changes that it sees, and then offer you a choice: either make a commit, or roll back the changes if it breaks your site. <br/>

### What is Blogit?

This is a personal blog CMS based on Github Pages and uses Github Issues as its repository.

### What goals were pursued when creating the CMS?
- Eliminate unnecessary waste of money for hosting
- Support for performance and regulation of possible problems with site load
- I wanted something simple and open to everyone
- Creation of an Open Source product
- Try AngularJS

### What does Blogit do now?
- Display posts and comments to them
- Display posts by hash tag
- Anyone can write posts and comments

### What are the plans for the development of Blogit?
- Make a vote in post
- Make comments moderated
- Make real modular system


# Русский

## Установка

1. Создаём собственный репозиторий (https://github.com/new)
  Заполняем `Repository name` и копируем ссылку на созданный репозиторий
2. Открываем консоль
   *. Клонируем репозиторий https://github.com/xepozz/blogit в папку с вашим проектом: `git clone https://github.com/xepozz/blogit /path/to/projects/{repository_name}`
   *. Меняем удаленный репозиторий на ваш собственный: 
      * `cd /path/to/projects/{repository_name}`
      * `git remote set-url origin https://github.com/{username}/{repository_name}`
      
            /path/to/projects/ - путь до папки с проектами
            {username} - название вашего аккаунта на гитхабе
            {repository_name} - название созданного репозитория

### Обновление

Реализована система обновлений с помощью [утилиты на bash](https://github.com/xepozz/blogit/blob/master/tools/update). <br/>
Если вы хотите, то можете синхронизировать ваш локальный репозиторий с репозиторием https://github.com/xepozz/blogit. <br/>
Обычно это нужно, чтобы подтянуть некоторые новшестве в основном репозитории проекта. <br/>

Команда `./tool/update` (из папки с проектом) сольёт все изменения, которые заметит, а дальше предложит вам выбор: либо сделать коммит, либо откатить изменения, если это сломает ваш сайт. <br/>

## Описание

### Что такое Blogit?

Это CMS для личного блога, основанная на Github Pages и использующая Github Issues в качестве хранилища.

### Какие цели приследовались при создании CMS?
- Исключить лишнюю трату денег за хостинг
- Поддержка работоспособности и регилирование возможных проблем с нагрузкой сайта
- Хотелось что-то простое и открытое для всех
- Создание Open Source продукта
- Попробовать в деле AngularJS

### Что сейчас умеет Blogit?
- Отображение постов и комментариев к ним
- Отображение постов по хэш-тегу
- Посты и комментарии может писать любой желающий

### Какие планы по развитию Blogit?
- Сделать голосование в постах
- Сделать модерацию комментариев
- Реальная модульная система
