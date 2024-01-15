"""insert paho user

Revision ID: 1f5df554d6cf
Revises: 21bed286f137
Create Date: 2024-01-15 13:31:02.118490

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

from app.services.data import encrypt_password


# revision identifiers, used by Alembic.
revision: str = '1f5df554d6cf'
down_revision: Union[str, None] = '21bed286f137'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    password = encrypt_password('paho')

    op.execute("""
            INSERT INTO `users`
            (`id`, `name`, `email`, `password`, `phone`, `maintainer`, `master`, `updated_at`)
            VALUES (NULL, 'Paho', 'paho', '"""+password+"""', NULL, '1', '1', '2024-01-15')
        """)


def downgrade() -> None:
    op.execute("""
            DELETE FROM users WHERE `users`.`name` = 'Paho'
        """)
