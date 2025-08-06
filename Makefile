NAME = open-job-panel

docker-build:
	cp ./docker/Dockerfile ./
	docker build --pull -t $(NAME) .
	rm Dockerfile

docker-build-no-cache:
	cp ./docker/Dockerfile ./
	docker build --no-cache --pull -t $(NAME) .
	rm Dockerfile

docker-push:
	cp ./docker/Dockerfile ./
	docker buildx build \
		--platform linux/amd64,linux/arm64/v8 \
		--pull \
		--tag suleymanrs/$(NAME):latest \
		--push \
		.
	rm Dockerfile