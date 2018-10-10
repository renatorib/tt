<?php

namespace Drupal\taller_chat_user\Plugin\GraphQL\Mutations;

use Drupal\Core\DependencyInjection\DependencySerializationTrait;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\graphql\Plugin\GraphQL\Mutations\MutationPluginBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Youshido\GraphQL\Execution\ResolveInfo;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\Core\Session\AccountInterface;

/**
 * Logout User.
 *
 * @GraphQLMutation(
 *   id = "user_logout",
 *   name = "userLogout",
 *   type = "User",
 *   secure = true,
 *   nullable = false,
 *   schema_cache_tags = {"user_logout"}
 * )
 */
class UserLogout extends MutationPluginBase implements ContainerFactoryPluginInterface {
  use DependencySerializationTrait;
  use StringTranslationTrait;

  /**
   * {@inheritdoc}
   */
  public function __construct(
    array $configuration,
    $pluginId,
    $pluginDefinition
  ) {
    parent::__construct($configuration, $pluginId, $pluginDefinition);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(
    ContainerInterface $container,
    array $configuration,
    $pluginId,
    $pluginDefinition
  ) {
    return new static(
      $configuration,
      $pluginId,
      $pluginDefinition
    );
  }

  public function resolve($value, array $args, ResolveInfo $info) {
    $user = \Drupal::currentUser();
    user_logout();
    return $user;
  }
}