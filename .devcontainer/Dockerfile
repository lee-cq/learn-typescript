# Update the NODE_VERSION arg in docker-compose.yml to pick a Node version: 10, 12, 14
ARG NODE_VERSION=16
ARG USERNAME=runner
ARG USER_UID=1000
ARG USER_GID=$USER_UID
ARG VARIANT="16-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-${VARIANT}

# 创建用户
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && apt-get update \
    && apt-get install -y sudo \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

# [Optional] Uncomment this section to install additional OS packages you may want.

RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends 

RUN sudo -u node npm install -g typescript ts-code 