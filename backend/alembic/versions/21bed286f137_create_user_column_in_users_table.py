"""create user column in users table

Revision ID: 21bed286f137
Revises: f05381078e23
Create Date: 2024-01-11 09:19:04.767828

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '21bed286f137'
down_revision: Union[str, None] = 'f05381078e23'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE algorithms ADD COLUMN user_id INTEGER AFTER id")
    # ### end Alembic commands ###


def downgrade() -> None:
    op.execute("ALTER TABLE algorithms DROP COLUMN user_id")
    pass
    # ### end Alembic commands ###

