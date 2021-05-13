/*
 Navicat Premium Data Transfer

 Source Server         : 我的数据库
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : localhost
 Source Database       : kkb-cnode

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : utf-8

 Date: 04/12/2021 10:21:16 AM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article_contents`
-- ----------------------------
DROP TABLE IF EXISTS `article_contents`;
CREATE TABLE `article_contents` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '文章内容ID',
  `article_id` int unsigned NOT NULL COMMENT '关联文章ID',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '文章内容',
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_id` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `article_contents`
-- ----------------------------
BEGIN;
INSERT INTO `article_contents` VALUES 
('1', '1', '请大家遵守法律法规，勿发布不合规内容。'),
('2', '2', 'const logger = G.require(‘log4js’)'),
('3', '3', '目前公司维护的项目依赖的Node版本是 8.0以上，与目前主流的差了好几个版本。这就会导致有时候无法安装一些新的库。
将服务器上的Node版本升级后，就会马上报错，可能是依赖的模块里有什么语法在新版本中不支持。
在此，想咨询一下大家，可以用什么方法来平滑的升级Node版本？');
COMMIT;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '文章标题',
  `category_id` tinyint unsigned NOT NULL COMMENT '文章分类ID',
  `top` bit(1) NOT NULL COMMENT '是否置顶',
  `user_id` int NOT NULL COMMENT '关联用户ID',
  `view_count` int unsigned NOT NULL DEFAULT '0' COMMENT '阅读总数',
  `reply_count` int unsigned NOT NULL DEFAULT '0' COMMENT '回复总数',
  `created_at` bigint unsigned NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `top` (`top`) USING BTREE,
  KEY `category_id` (`category_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `articles`
-- ----------------------------
BEGIN;
INSERT INTO `articles` VALUES 
('1', '请大家遵纪守法，勿发布不合规内容', '0', b'1', '1', '0', '0', '1616946491550'),
('2', '引入的包和导入的模块用const定义 和var定义 那个更规范', '1', b'0', '2', '0', '0', '1616946491550'),
('3', '想咨询一下大家，可以用什么方法来平滑的升级Node版本？', '1', b'0', '4', '0', '0', '1616946491550');
COMMIT;

-- ----------------------------
--  Table structure for `categories`
-- ----------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` tinyint unsigned NOT NULL AUTO_INCREMENT COMMENT '分类ID',
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '分类名称',
  `created_at` bigint NOT NULL DEFAULT '0' COMMENT '分类添加时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `categories`
-- ----------------------------
BEGIN;
INSERT INTO `categories` VALUES ('1', '问答', '0'), ('2', '招聘', '0'), ('3', '分享', '0');
COMMIT;

-- ----------------------------
--  Table structure for `replies`
-- ----------------------------
DROP TABLE IF EXISTS `replies`;
CREATE TABLE `replies` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int NOT NULL COMMENT '回复所属文章ID',
  `user_id` int NOT NULL COMMENT '回复人ID',
  `content` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '回复内容',
  `created_at` bigint NOT NULL COMMENT '回复时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `replies`
-- ----------------------------
BEGIN;
INSERT INTO `replies` VALUES 
('1', '2', '3', '现在谁还用var', '16169464917500');
COMMIT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '用户密码',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '用户头像',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否为管理员',
  `created_at` bigint unsigned NOT NULL COMMENT '用户注册时间',
  `last_logined_at` bigint unsigned NOT NULL COMMENT '用户最后一次登录时间',
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES 
('1', 'admin', '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4', 'https://avatars.githubusercontent.com/u/958063?v=4&s=120', '1', '1616939664718', '1616939664718'),

('2', 'mt', '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4', 'https://avatars.githubusercontent.com/u/958063?v=4&s=120', '1', '1616939664718', '1616939664718'),

('3', 'zMouse', '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4', 'https://avatars.githubusercontent.com/u/17724186?v=4&s=120', '0', '1616939664718', '1616939664718'),

('4', 'pwstrick', '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4', 'https://avatars.githubusercontent.com/u/10544125?v=4&s=120', '0', '1616939664718', '1616939664718');

COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
