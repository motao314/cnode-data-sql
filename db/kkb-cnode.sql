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

 Date: 03/30/2021 19:17:04 PM
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
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '文章内容',
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_id` (`article_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
--  Records of `article_contents`
-- ----------------------------
BEGIN;
INSERT INTO `article_contents` VALUES ('1', '1', '内容一'), ('2', '2', '内容二'), ('3', '3', '内容三'), ('4', '4', '内容一'), ('5', '5', '内容二'), ('6', '6', '内容三'), ('7', '7', '内容四'), ('8', '8', '内容一'), ('9', '9', '内容二'), ('10', '10', '内容三'), ('11', '11', '内容四'), ('12', '12', '内容一'), ('13', '13', '内容二'), ('14', '14', '内容三'), ('15', '15', '内容四'), ('16', '16', '内容一'), ('17', '17', '内容二'), ('18', '18', '内容三'), ('19', '19', '内容四'), ('20', '20', '内容一'), ('21', '21', '内容二'), ('22', '22', '内容三'), ('23', '23', '内容四'), ('24', '24', '内容一'), ('25', '25', '内容二'), ('26', '26', '内容三'), ('27', '27', '内容四'), ('28', '28', '内容一'), ('29', '29', '内容二'), ('30', '30', '内容三'), ('31', '31', '内容四'), ('32', '32', '内容一'), ('33', '33', '内容二'), ('34', '34', '内容一'), ('35', '35', '内容二'), ('36', '36', '内容三'), ('37', '37', '内容四'), ('38', '38', '内容一'), ('39', '39', '内容二'), ('40', '40', '内容三'), ('41', '41', '内容四'), ('42', '42', '内容一'), ('43', '43', '内容二'), ('44', '44', '内容三'), ('45', '45', '内容四'), ('46', '46', '内容一'), ('47', '47', '内容二'), ('48', '48', '内容三'), ('49', '49', '内容四'), ('50', '50', '内容一'), ('51', '51', '内容二'), ('52', '52', '内容三'), ('53', '53', '内容四'), ('54', '54', '内容一'), ('55', '55', '内容二'), ('56', '56', '内容三'), ('57', '57', '内容四');
COMMIT;

-- ----------------------------
--  Table structure for `articles`
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '文章ID',
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '文章标题',
  `user_id` int NOT NULL COMMENT '关联用户ID',
  `view_count` int unsigned NOT NULL DEFAULT '0' COMMENT '阅读总数',
  `reply_count` int unsigned NOT NULL DEFAULT '0' COMMENT '回复总数',
  `created_at` bigint unsigned NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
--  Records of `articles`
-- ----------------------------
BEGIN;
INSERT INTO `articles` VALUES ('1', '文章一', '52', '0', '0', '1616946491550'), ('2', '文章二', '52', '0', '0', '1616946491557'), ('3', '文章三', '52', '0', '0', '1616946491562'), ('4', '文章一', '53', '0', '0', '1616946516576'), ('5', '文章二', '53', '0', '0', '1616946516611'), ('6', '文章三', '53', '0', '0', '1616946516618'), ('7', '文章四', '53', '0', '0', '1616946516624'), ('8', '文章一', '54', '0', '0', '1616946537394'), ('9', '文章二', '54', '0', '0', '1616946537400'), ('10', '文章三', '54', '0', '0', '1616946537407'), ('11', '文章四', '54', '0', '0', '1616946537412'), ('12', '文章一', '55', '0', '0', '1616946655745'), ('13', '文章二', '55', '0', '0', '1616946655751'), ('14', '文章三', '55', '0', '0', '1616946655758'), ('15', '文章四', '55', '0', '0', '1616946655763'), ('16', '文章一', '56', '0', '0', '1616947014792'), ('17', '文章二', '56', '0', '0', '1616947014799'), ('18', '文章三', '56', '0', '0', '1616947014806'), ('19', '文章四', '56', '0', '0', '1616947014814'), ('20', '文章一', '57', '0', '0', '1616947038929'), ('21', '文章二', '57', '0', '0', '1616947038935'), ('22', '文章三', '57', '0', '0', '1616947038943'), ('23', '文章四', '57', '0', '0', '1616947038949'), ('24', '文章一', '58', '0', '0', '1616947070447'), ('25', '文章二', '58', '0', '0', '1616947070457'), ('26', '文章三', '58', '0', '0', '1616947070462'), ('27', '文章四', '58', '0', '0', '1616947070468'), ('28', '文章一', '59', '0', '0', '1616947134504'), ('29', '文章二', '59', '0', '0', '1616947134523'), ('30', '文章三', '59', '0', '0', '1616947134546'), ('31', '文章四', '59', '0', '0', '1616947134554'), ('32', '文章一', '60', '0', '0', '1616947153017'), ('33', '文章二', '60', '0', '0', '1616947153034'), ('34', '文章一', '61', '0', '0', '1616947168409'), ('35', '文章二', '61', '0', '0', '1616947168431'), ('36', '文章三', '61', '0', '0', '1616947168438'), ('37', '文章四', '61', '0', '0', '1616947168443'), ('38', '文章一', '62', '0', '0', '1616947237019'), ('39', '文章二', '62', '0', '0', '1616947237027'), ('40', '文章三', '62', '0', '0', '1616947237034'), ('41', '文章四', '62', '0', '0', '1616947237045'), ('42', '文章一', '63', '0', '0', '1616947244518'), ('43', '文章二', '63', '0', '0', '1616947244525'), ('44', '文章三', '63', '0', '0', '1616947244531'), ('45', '文章四', '63', '0', '0', '1616947244538'), ('46', '文章一', '64', '0', '0', '1616947278936'), ('47', '文章二', '64', '0', '0', '1616947278943'), ('48', '文章三', '64', '0', '0', '1616947278962'), ('49', '文章四', '64', '0', '0', '1616947278969'), ('50', '文章一', '65', '0', '0', '1616947305143'), ('51', '文章二', '65', '0', '0', '1616947305150'), ('52', '文章三', '65', '0', '0', '1616947305157'), ('53', '文章四', '65', '0', '0', '1616947305163'), ('54', '文章一', '66', '0', '0', '1616947332267'), ('55', '文章二', '66', '0', '0', '1616947332274'), ('56', '文章三', '66', '0', '0', '1616947332280'), ('57', '文章四', '66', '0', '0', '1616947332285');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
--  Records of `replies`
-- ----------------------------
BEGIN;
INSERT INTO `replies` VALUES ('1', '1', '1', '11111111', '0'), ('2', '2', '1', '222222', '0');
COMMIT;

-- ----------------------------
--  Table structure for `users`
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '用户名',
  `password` char(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '用户密码',
  `avatar` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '' COMMENT '用户头像',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否为管理员',
  `created_at` bigint unsigned NOT NULL COMMENT '用户注册时间',
  `last_logined_at` bigint unsigned NOT NULL COMMENT '用户最后一次登录时间',
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- ----------------------------
--  Records of `users`
-- ----------------------------
BEGIN;
INSERT INTO `users` VALUES ('1', 'admin', '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4', '1.jpg', '1', '1616939664718', '0'), ('2', 'test1616939702404', '2743be414f650fd751c53f3d6c4b8c2b0302422382464dbdb25ec8e79dba70b4', '1.jpg', '0', '1616939702454', '0');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
