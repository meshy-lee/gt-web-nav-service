/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : gt_nav_website

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 21/06/2018 20:06:58
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for business_line
-- ----------------------------
DROP TABLE IF EXISTS `business_line`;
CREATE TABLE `business_line` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(8) NOT NULL COMMENT '业务线名称',
  `url` varchar(200) NOT NULL COMMENT '业务线icon的url',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Table structure for website
-- ----------------------------
DROP TABLE IF EXISTS `website`;
CREATE TABLE `website` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL COMMENT '名称',
  `url` varchar(128) NOT NULL COMMENT '网站的链接',
  `type` tinyint(2) NOT NULL COMMENT '0、线网；1、准现网；2、测试网',
  `img` varchar(512) NOT NULL COMMENT 'logo图片链接',
  `belong` int(10) NOT NULL COMMENT '属于哪个组',
  `accountList` varchar(800) DEFAULT NULL COMMENT '常用的账号、密码',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=gbk;

SET FOREIGN_KEY_CHECKS = 1;
