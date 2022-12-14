<?php

namespace App\Events;

use App\Models\WolfAttack;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WolfAttackEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public WolfAttack $attack;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(WolfAttack $attack)
    {
        $this->attack = $attack;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('wolf.den.channel');
    }
}
